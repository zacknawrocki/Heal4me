import sys
import os
import warnings
import pickle
warnings.filterwarnings('ignore') 
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from sklearn.model_selection import train_test_split
from keras import layers
from keras.models import Sequential
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import tensorflow as tf 
import nltk
import csv
import numpy as np
import pandas as pd

from PreProcessPosts import PreProcessPosts

# Format the data from a given file
def buildDataset(filename):
    dataset  = [] 
    with open(filename) as f:
        csv_reader = csv.reader(f, delimiter=',')
        at_header = True
        for row in csv_reader:
            if at_header:
                at_header = not at_header
                continue
            dataset.append( {"text": row[1], "label": row[2]} )    
    return dataset

# Create the convolutional model
def create_model(num_filters, kernel_size, vocab_size, embedding_dim, maxlen):
    model = Sequential()
    model.add(layers.Embedding(vocab_size, embedding_dim, input_length=maxlen))
    model.add(layers.Conv1D(num_filters, kernel_size, activation='relu'))
    model.add(layers.GlobalMaxPooling1D())
    model.add(layers.Dense(10, activation='relu'))
    model.add(layers.Dense(1, activation='sigmoid'))
    model.compile(optimizer='adam',
                  loss='binary_crossentropy',
                  metrics=['accuracy'])
    return model

if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print("ERROR: missing args")
        sys.exit(1)
    
    # Create the dataset
    dataset = buildDataset(sys.argv[1])

    # Pre-process (tokenize and denoise) post texts
    postProcessor = PreProcessPosts()
    X, y = postProcessor.processPosts(dataset)

    # Main settings
    epochs = 20
    embedding_dim = 50
    maxlen = 100
    output_file = 'data/output.txt'

    # Train-test split
    posts_train, posts_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=1000)

    # Tokenize words
    tokenizer = Tokenizer(num_words=5000)
    tokenizer.fit_on_texts(posts_train)
    X_train = tokenizer.texts_to_sequences(posts_train)
    X_test = tokenizer.texts_to_sequences(posts_test)

    # Adding 1 because of reserved 0 index
    vocab_size = len(tokenizer.word_index) + 1

    # Pad sequences with zeros
    X_train = pad_sequences(X_train, padding='post', maxlen=maxlen)
    X_test = pad_sequences(X_test, padding='post', maxlen=maxlen)

    # Create model
    model = create_model(64, 5, vocab_size, embedding_dim, maxlen)
    history = model.fit(X_train, y_train,
                        epochs=30,
                        verbose=False,
                        validation_data=(X_test, y_test),
                        batch_size=10)
    
    # Evaluate testing set
    loss, accuracy = model.evaluate(X_train, y_train, verbose=False)
    print("Training Accuracy: {:.4f}".format(accuracy))
    loss, accuracy = model.evaluate(X_test, y_test, verbose=False)
    print("Testing Accuracy:  {:.4f}".format(accuracy))

    # Export classifier/tokenizer
    with open('classifier.pkl', 'wb') as f:
        pickle.dump(model, f)
    with open('tokenizer.pkl', 'wb') as f:
        pickle.dump(tokenizer, f)
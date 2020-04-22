import sys
import os
import warnings
warnings.filterwarnings('ignore') 
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from keras import layers
from keras.models import Sequential
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

if __name__ == '__main__':
    if len(sys.argv) <= 1:
        print("ERROR: missing args")
        sys.exit(1)
    
    # Create the dataset
    dataset = buildDataset(sys.argv[1])

    # Pre-process (tokenize and denoise) post texts
    postProcessor = PreProcessPosts()
    X, y = postProcessor.processPosts(dataset)

    # Divide the processed data into training and testing sets
    posts_train, posts_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=1000)

    # Initialize and fit a CountVectorizer
    vectorizer = CountVectorizer()
    vectorizer.fit(posts_train)

    X_train = vectorizer.transform(posts_train)
    X_test  = vectorizer.transform(posts_test)

    # Enter test sentences here.
    X_real_data = [
        "I want to kill myself. I'm tired of being alive. Today's my last day on earth. i repeatedly cut myself",
        "I have a happy life. I'm rich, I have a huge mansion, and a loving wife..",
        "Today, I went to school and I got bullied. They made fun of me and now I feel sad.",
        "I have a gun. I just bought it at the cornerstore. They don't think I have it in me, but I'll show them.",
        "I just got a promotion in my job; now im the boss. It's nice being at the top. I had a delicious cake to celebrate.]",
        "Today it was dark outside, just like I am on the inside. I was listening to some music and i had a thought: what if the world ended",
        "Ever since I won the lottery, life has been so easy, I've got money and everyone's my friend",
        "I just got married, and I already have a beautiful baby on the way. I've never been happier in my life!!"
    ]

    X_real_data = vectorizer.transform(X_real_data)

    input_dim = X_train.shape[1]  # Number of features

    # Use a Sequential model, which enables the use of Keras layers
    model = Sequential()

    # Add Dense layers, which use weights and biases
    model.add(layers.Dense(10, input_dim=input_dim, activation='relu'))
    model.add(layers.Dense(1, activation='sigmoid'))

    # Configure the learning process, specifying the optimizer and loss functions
    model.compile(loss='binary_crossentropy', 
        optimizer='adam', 
        metrics=['accuracy'])    
    
    # View the model's summary information
    # NODE 1:
    # Have 11761 dimensions; need weights/dim and each node
    # 11761 * 10 nodes + 10 biases/node = 11760 Params
    # NODE 2:
    # 1 Node * (10 weights/node + 1 bias/node)
    # print(model.summary())

    # Train the model. Epochs=iterations, batch size=number of samples/epoch
    # Larger batch size increases the speed of the computation (less epochs)
    # but requires more memory; may degrade the model
    history = model.fit(X_train, y_train,
        epochs=40,
        verbose=False,
        validation_data=(X_test, y_test),
        batch_size=10)

    # Measure the model's accuracy
    loss, accuracy = model.evaluate(X_train, y_train, verbose=False)
    print("Training Accuracy: {:.4f}".format(accuracy))
    loss, accuracy = model.evaluate(X_test, y_test, verbose=False)
    print("Testing Accuracy:  {:.4f}".format(accuracy))

    print(model.predict(X_real_data))
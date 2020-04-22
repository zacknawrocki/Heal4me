import sys
import csv
import nltk
import pandas as pd
import numpy as np
from PreProcessPosts import PreProcessPosts
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

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

    filepath_dict = {'yelp':   'data/yelp_labelled.txt',
                    'amazon': 'data/amazon_cells_labelled.txt',
                    'imdb':   'data/imdb_labelled.txt'}

    sentences_train, sentences_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=1000)

    vectorizer = CountVectorizer()
    vectorizer.fit(sentences_train)

    X_train = vectorizer.transform(sentences_train)
    X_test  = vectorizer.transform(sentences_test)

    classifier = LogisticRegression(C=0.5,max_iter=500)
    classifier.fit(X_train, y_train)
    score = classifier.score(X_test, y_test)

    # Enter test sentences here.
    X_real_data = [
        "It's not the same as it used to be... I think about my killing myself often",
        "I just won the lottery and my life has really never been better."
    ]

    X_real_data = vectorizer.transform(X_real_data)
    print(classifier.predict(X_real_data))
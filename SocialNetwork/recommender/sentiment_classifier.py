import sys
import csv
import nltk
from PreProcessPosts import PreProcessPosts

from numpy import array

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
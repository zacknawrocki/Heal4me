import sys
import os
import warnings
import pickle
warnings.filterwarnings('ignore') 
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from PreProcessPosts import PreProcessPosts

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("ERROR: missing args")
        sys.exit(1)

    X_real_data = [
        "I want to kill myself. I'm tired of being alive. Today's my last day on earth. i repeatedly cut myself",
        "I have a happy life. I'm rich, I have a huge mansion, and a loving wife..",
        "Today, I went to school and I got bullied. They made fun of me and now I feel sad.",
        "I have a gun. I just bought it at the cornerstore. They don't think I have it in me, but I'll show them.",
        "I just got a promotion in my job; now im the boss. It's nice being at the top. I had a delicious cake to celebrate.]",
        "Today it was dark outside, just like I am on the inside. I was listening to some music and i had a thought: what if the world ended",
        "Ever since I won the lottery, life has been so easy, I've got money and everyone's my friend",
        "I just got married, and I already have a beautiful baby on the way. I've never been happier in my life!!",
        "I'm a happy guy. Although I consider suicide to be a sin. I don't blame people for killing themselves.",
        "I am considering ending my life. I don't really feel in control."
    ]
    
    model, tokenizer = None, None
    maxlen = 100
    with open('classifier.pkl', 'rb') as f:
        model = pickle.load(f)

    with open('tokenizer.pkl', 'rb') as f:
        tokenizer = pickle.load(f)

    # Pre-process data
    postProcessor = PreProcessPosts()
    processed_data = [postProcessor._processPost(x) for x in X_real_data]

    processed_data = tokenizer.texts_to_sequences(processed_data)
    processed_data = pad_sequences(processed_data, padding='post', maxlen=maxlen)
    print(model.predict(processed_data))
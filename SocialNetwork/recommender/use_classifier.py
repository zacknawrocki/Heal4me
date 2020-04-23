import sys
import os
import json
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

    post_dict = json.loads(sys.argv[1])
    post_list = []
    
    for item in post_dict:
        post_list.append(item['text'])

    if len(post_list) == 0:
        sys.exit(0)

    # X_real_data = [
    #     "I want to kill myself. I'm tired of being alive. Today's my last day on earth. i repeatedly cut myself",
    #     "I have a happy life. I'm rich, I have a huge mansion, and a loving wife..",
    #     "Today, I went to school and I got bullied. They made fun of me and now I feel sad.",
    #     "I have a gun. I just bought it at the cornerstore. They don't think I have it in me, but I'll show them.",
    #     "I just got a promotion in my job; now im the boss. It's nice being at the top. I had a delicious cake to celebrate.]",
    #     "Today it was dark outside, just like I am on the inside. I was listening to some music and i had a thought: what if the world ended",
    #     "Ever since I won the lottery, life has been so easy, I've got money and everyone's my friend",
    #     "I just got married, and I already have a beautiful baby on the way. I've never been happier in my life!!",
    #     "I'm a happy guy. Although I consider suicide to be a sin. I don't blame people for killing themselves.",
    #       
    # ]
    
    model, tokenizer = None, None
    maxlen = 100
    # print(os.path.join(os.path.dirname(__file__),"classifier.pkl"), 'rb')
    with open(os.path.join(os.path.dirname(__file__),"classifier.pkl"), 'rb') as f:
        model = pickle.load(f)

    with open(os.path.join(os.path.dirname(__file__),"tokenizer.pkl"), 'rb') as f:
        tokenizer = pickle.load(f)

    # Pre-process data
    postProcessor = PreProcessPosts()
    processed_data = [postProcessor._processPost(x) for x in post_list]

    processed_data = tokenizer.texts_to_sequences(processed_data)
    processed_data = pad_sequences(processed_data, padding='post', maxlen=maxlen)
    results = model.predict(processed_data)

    # print(results)

    avg_score = 0
    for l in results:
        avg_score += l[0]
    avg_score /= len(results)
    print(avg_score)
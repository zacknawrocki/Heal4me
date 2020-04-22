import sys
import json
import pandas as pd
import random
import functools
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# GLOBAL VARIABLES
global recently_viewed
global possible_recommendations

# Helper functions
def get_id_from_index(index):
    return df[df.index == index]["_id"].values[0]

def get_text_from_index(index):
	return df[df.index == index]["text"].values[0]

def get_index_from_text(text):
	return df[df.text == text]["index"].values[0]

# Create a pandas dataframe via CSV or JSON
def create_dataframe(src, type):
    if type == "JSON":
        return pd.read_json(src)
    if type == "CSV":
        return pd.read_csv(src)
    return None

# concatenate recently viewed content
def combine_recently_viewed(rv_data):
    combined_str = ""
    for i in range(len(rv_data)):
        combined_str += rv_data[i]["text"]
        if i < len(rv_data) - 1:
            combined_str += " "
    return combined_str

# attach an index to each "object"
def apply_indices(list_of_dicts):
    i = 0
    for di in list_of_dicts:
        di["index"] = i
        i += 1

if __name__ == "__main__":
    recently_viewed = sys.argv[1]
    possible_recommendations = sys.argv[2]
    
    # Convert JSON strings to lists of dicts
    rv_data = json.loads(recently_viewed)
    pr_data = json.loads(possible_recommendations)
    pr_data_len = len(pr_data)

    # Combine each recently viewed post's texts into one string
    combined_rv = combine_recently_viewed(rv_data)
    pr_data.append({"_id": "0x0", "text": combined_rv})
    pr_data_len += 1
    apply_indices(pr_data)
    
    # Create a dataframe
    src_format = "JSON"
    df = create_dataframe(json.dumps(pr_data), src_format)

    # Create a count matrix
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(df["text"])

    # Perform a cosine similarity test to find similar posts to those
    # that have been viewed within the last X days
    cosine_sim = cosine_similarity(count_matrix)
    similar_posts = list(enumerate(cosine_sim[pr_data_len - 1]))
    similar_posts_ids = []

    # Allow up to 5 irrelevant posts to be displayed
    irrelevant_posts_allowed = 5

    # Calculate the number of similar and non-similar posts
    num_zero_sim = len([x for x in similar_posts if x[1] == 0])
    num_sim = len(similar_posts_ids) - num_zero_sim

    for post in similar_posts:
        # If the number of similar posts is less than 5, allow up to 5 irrelevant posts
        if post[0] != pr_data_len - 1 and (post[1] != 0 or num_sim < 5 and irrelevant_posts_allowed):
            similar_posts_ids.append({"_id": get_id_from_index(post[0])})
            irrelevant_posts_allowed -= 1
    print(json.dumps((similar_posts_ids)))
import re
from string import punctuation 
from nltk.corpus import stopwords 
from nltk.stem.wordnet import WordNetLemmatizer

class PreProcessPosts:
    def __init__(self):
        self._stopwords = set(stopwords.words('english') + list(punctuation))
    
    def processPosts(self, list_of_posts):
        processedPosts=[]
        labels=[]
        for post in list_of_posts:
            processedPosts.append(self._processPost(post["text"]))
            labels.append(1 if post["label"] == "Positive" else 0)
        return (processedPosts,labels)

    def _processPost(self, post):
        post = post.lower() # convert text to lower-case
        post = re.sub('[^a-zA-Z]', ' ', post)  # Remove punctuations and numbers
        post = re.sub(r"\s+[a-zA-Z]\s+", ' ', post) # Single character removal
        post = re.sub(r'\s+', ' ', post) # Removing multiple spaces
        post = ' '.join(self.normalize(list(post.split(' '))))
        return post.strip()

        # Convert to base words
    def normalize(self, post_tokens):
        lem = WordNetLemmatizer()
        normalized_post = []
        for word in post_tokens:
            normalized_text = lem.lemmatize(word,'v')
            normalized_post.append(normalized_text)
        return normalized_post
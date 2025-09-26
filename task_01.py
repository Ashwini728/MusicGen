import numpy as np
import librosa
import tensorflow as tf
import tensorflow_hub as hub
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Load pretrained YAMNet model from TensorFlow Hub
yamnet_model_handle = 'https://tfhub.dev/google/yamnet/1'
yamnet_model = hub.load(yamnet_model_handle)
class_map_path = yamnet_model.class_map_path().numpy()
with open(class_map_path, 'r') as f:
    class_names = [line.strip() for line in f]
print("YAMNet classes loaded:", len(class_names))

# Path to dataset
dataset_path = "MUSIC_MP3" 

# List of genres (classes)
genres = os.listdir(dataset_path)
print("Genres found:", genres)

def extract_yamnet_features(file_path):
    # Load audio
    waveform, sr = librosa.load(file_path, sr=16000)
    waveform = waveform.astype(np.float32)

    # Run YAMNet
    scores, embeddings, spectrogram = yamnet_model(waveform)
    # Average embeddings over time to get a single vector
    feature_vector = tf.reduce_mean(embeddings, axis=0).numpy()
    return feature_vector

X = []
y = []

for genre in genres:
    genre_folder = os.path.join(dataset_path, genre)
    for file in os.listdir(genre_folder):
        if file.endswith(".wav") or file.endswith(".mp3"):
            file_path = os.path.join(genre_folder, file)
            features = extract_yamnet_features(file_path)
            X.append(features)
            y.append(genre)

# Convert to arrays
X = np.array(X)
y = np.array(y)

# Encode labels
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
print("Training samples:", len(X_train), "Testing samples:", len(X_test))

from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
acc = accuracy_score(y_test, y_pred)
print("Test Accuracy:", acc)
print("Classification Report:\n", classification_report(y_test, y_pred, target_names=encoder.classes_))

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(10,8))
sns.heatmap(cm, annot=True, fmt="d", xticklabels=encoder.classes_, yticklabels=encoder.classes_, cmap="Blues")
plt.xlabel("Predicted Genre")
plt.ylabel("True Genre")
plt.title("Confusion Matrix - YAMNet Features + Random Forest")
plt.show()

import joblib
joblib.dump(model, "yamnet_rf_music_model.pkl")
print("Model saved as yamnet_rf_music_model.pkl")

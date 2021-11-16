import os
import sys
from flask import Flask
import os, uuid
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, __version__


root_folder = os.path.abspath(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))
sys.path.append(root_folder)
app = Flask(__name__)
app.config.from_object('config')
storage_account_connection_string = app.config["STORAGE_ACCOUNT_CONNECTION_STRING"]

blob_service_client = BlobServiceClient.from_connection_string(storage_account_connection_string)

def create_container(container_name: str):
    blob_service_client.create_container(container_name)

def upload_file(container_name: str, local_file_name: str, full_path_file: str):
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=local_file_name)

    with open(full_path_file, "rb") as data:
        blob_client.upload_blob(data)
    return blob_client.url
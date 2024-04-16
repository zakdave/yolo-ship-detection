from ultralytics import YOLO
from paths import image2_path
import json
import requests

# f = open('/Users/zacharydavidson/Documents/GitHub/yolo-ship-detection/src/yolo/data.json')
# data = json.load(f)

# Load a pretrained YOLOv8n model
model = YOLO('yolov8n.pt')

# Define remote image or video URL
source = "https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.5kZSADQEUFFwg7PdyZ5TvwHaFj%26pid%3DApi&f=1&ipt=da802b8193c4104a71bedf56174aa68f6b8d92eddefb3cbf2d4231ebdc848ee7&ipo=images.png"
source2 = "https://tse1.mm.bing.net/th?id=OIP.5kZSADQEUFFwg7PdyZ5TvwHaFj&pid=Api&f=1&ipt=da802b8193c4104a71bedf56174aa68f6b8d92eddefb3cbf2d4231ebdc848ee7&ipo=images"


# Run inference on the source
results = model(source2, save=True, stream=True)  # list of Results objects
# f.close()

# <a href="https://duckduckgo.com/?t=h_&amp;q=boat&amp;iax=images&amp;ia=images&amp;iai=http%3A%2F%2F4.bp.blogspot.com%2F-49L1_ik2dEo%2FUbRervcGdnI%2FAAAAAAAALOo%2F3_0Rd-K8Kvg%2Fs1600%2FHdhut.blogspot.com%2B%2525284%252529.jpeg#
#                                                                                     'https:  /   / 4.bp.blogspot.com/  -49L1_ik2dEo/  UbRervcGdnI/  AAAAAAAALOo/  3_0Rd-K8Kvg/s1600/Hdhut.blogspot.com+%25284%2529.jpeg'
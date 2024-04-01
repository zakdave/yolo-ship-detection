from ultralytics import YOLO
from paths import image_path

model = YOLO('yolov8n.pt')
source = '/Users/zacharydavidson/Documents/GitHub/yolo-ship-detection/src/yolo/image.png'
results = model(source, save=True)

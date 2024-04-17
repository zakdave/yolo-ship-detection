from ultralytics import YOLO
from paths import data_path
import json

detections = {}

#open json from scraper
f = open(data_path)
data = json.load(f)

#loop through categories
for key in data.keys():
    print(f"Detecting query: {key}")
    
    #create array of category if it doesn't exist
    if key not in detections: 
        detections[key] = []

    #run recognition on data set
    for img in data[key]:

        #initilaize detection output
        detection = {}
        detection["url"] = img
        detection["detected"] = False

        model = YOLO('yolov8n.pt')
        results = model(img, classes=[8],save=True) #only detect class 8: 'boat'
        for result in results:
            if len(result.boxes.cls) < 1 : continue
            for cls in result.boxes.cls:
                if result.boxes.cls[0].item() == 8.0:
                    print(f'Boat Detected: {img}')
                    detection["detected"] = True
                    break
        #add to detections array
        detections[key].append(detection)

#close file
f.close()


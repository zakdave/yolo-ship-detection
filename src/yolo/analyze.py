from output import detections

def lookup(category):
    detected = 0
    total = len(detections[category])
    
    for detection in detections[category]:
        if detection["detected"] == True:
            detected += 1
    print(f'Category: {category}')
    print(f'Total Boats: {total}')
    print(f'Total Detected: {detected}\n')

for key in detections:
    lookup(key)


    


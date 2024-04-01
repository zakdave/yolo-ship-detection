import cv2 as cv
from paths import cfg_path, weights_path, image_path
import numpy as np
import time

#load horse image
img = cv.imread(image_path)
cv.imshow('window', img)
cv.waitKey(1)

#load the network with config and weights
net = cv.dnn.readNetFromDarknet(cfg_path, weights_path)
net.setPreferableBackend(cv.dnn.DNN_BACKEND_OPENCV)

#confirm configuration and get layer names
ln = net.getLayerNames()
print(len(ln), ln)

# construct a blob from the image, this is the network input 
blob = cv.dnn.blobFromImage(img, 1/255.0, (416, 416), swapRB=True, crop=False)
r = blob[0, 0, :, :]

#what is im show
cv.imshow('blob', r)
text = f'Blob shape={blob.shape}'
cv.displayOverlay('blob', text)
cv.waitKey(1)

#input blob, output to next layer
net.setInput(blob)
t0 = time.time()
outputs = net.forward(ln)
t = time.time()

#display output
cv.displayOverlay('window', f'forward propagation time={t-t0}')
cv.imshow('window',  img)
cv.waitKey(0)
cv.destroyAllWindows()
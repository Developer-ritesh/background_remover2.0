pip install rembg pillow

https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx

mkdir -p ~/.u2net
mv ~/Downloads/u2net.onnx ~/.u2net/u2net.onnx


<!-- image inhancer -->
pip install realesrgan pillow



-- run docker
docker build -t ai_tools .

docker buildx build --platform=linux/amd64 -t ai_tools .

docker run -it --rm -p 3999:3999 ai_tools

<!-- run in background -->
docker run -d -p 3999:3999 --name ai_tools ai_tools

<!-- see logs -->
docker logs -f ai_tools







-----------
pip install pillow
pip install numpy opencv-python piexif
pip install Pillow PyExifTool





--


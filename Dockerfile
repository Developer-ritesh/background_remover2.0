# Base image with Node.js and Python
FROM node:18-slim

# Install Python, pip, and system dependencies
RUN apt-get update && apt-get install -y \
    python3 python3-venv python3-dev build-essential wget curl git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app


# Create Python virtual environment and install Python packages
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --upgrade pip
RUN pip install rembg pillow
RUN pip install onnxruntime

# Copy package.json and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Copy the pre-downloaded u2net models into container
RUN mkdir -p /root/.u2net
COPY .u2net /root/.u2net

# Expose port
EXPOSE 3999

# Start the Node app
CMD ["npm", "start"]

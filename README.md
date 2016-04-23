# dslr-web-interface
Web interface for DSLRs. Powered by gphoto2. Intended to run on a Raspberry Pi.

## Install
`sudo apt-get install gphoto2`

`npm install`

## Usage
Run `npm start` to start the server.
Connect your camera via USB. If your OS mounts it automatically then unmount it. If you don't do this, gphoto will complain that it cannot claim the USB device.

View `http://localhost:3000`
Press the button and wait. In theory it should take a photo and display it to you in the browser! Maybe. :-)

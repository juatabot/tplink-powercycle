# tplink-powercycle

This small script is used to remotely powercycle a TP Link Casa smart plug.

    $ node powercycle.js
    Options:
      --version       Show version number                            [boolean]
      --username, -l  username for TP-Link Cloud                     [required]
      --password, -p  password for TP-Link Cloud                     [required]
      --device, -d    device name to powercycle                      [required]
      --help          Show help                                      [boolean]

# Steps to use

1. Install Node from nodejs.org
2. Clone this repo:

    $ git clone https://github.com/seemong/tplink-powercycle.git

3. Change into the directory:

    $ cd tplink-powercycle

4. Install yargs

    $ npm install yargs

5. Install the tplink-cloud-api

    $ npm install tplink-cloud-api

6. Run the application

    $ node powercycle.js --username=your_login --password=your_password \
        --device=your_device_name

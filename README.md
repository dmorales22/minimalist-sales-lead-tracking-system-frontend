DEMO Site: https://minimalist-sales-lead-tracking-system-frontend.vercel.app/

This is the frontend for a simple sales lead tracker. A user can create, edit, view, and delete sales leads with appropriate feedback and input validation. This is built with Next.js using Axios request library to query the backend. This project is structured using the MVC (Model, Viewer, Controller) design pattern with this frontend implementing the Viewer aspect.

## Install

To install and run the frontend on a server, make sure you have these prerequisite programs installed onto your server.

- node 14 and above
- npm
- Git

Lookup any guides out there to install this software relating to your OS and development environment.

### Download Project

You can download this project by using the git clone command. Make sure you have proper authorization to use to this Git repository as it may ask for a username and password (or token).

`git clone https://github.com/dmorales22/minimalist-sales-lead-tracking-system-frontend`

### Quick Start

Once the project is downloaded. Go to the directory of the project in your command line and run this command to install dependencies:

`npm install`

Then start up in development mode with these command(s):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

To build for production use this command: 

`npm run build`

If there are any errors, make sure you have the prerequisite software and any dependencies installed first.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

NOTE: Next.js uses .env.local in root of the project.

`NEXT_PUBLIC_BASEURL` The base URL that the frontend will call to retrieve data from the backend.

Ex: http://localhost:5000

## Contributors

Here are the list of people have contributed to this repo:

- David Morales (dmoral1414@gmail.com)

## Copyright

© 2023 David Morales

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

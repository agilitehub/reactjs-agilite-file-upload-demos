# reactjs-agilite-file-upload-demos

A Demo ReactJS App that shows how to upload 1 or more files to Agilit-e's File Managers via Node-RED Flows

***
**Requirements:**

In order to use the ReactJS Agilit-e File Upload Demo project you need to have an Agilit-e Account and a Node-RED environment.
***

**1. Installation**
```
npm install reactjs-agilite-file-upload-demos
```
**2. Configuration**

The project contains a "contents" folder, where you can find the *Node-RED Flows* and the *Agilit-e GridFS Connector Profile*. The Node-RED flows contain HTTP Request nodes that gets called, which then formats the file data accordingly and then uploads the files either to Agilit-e using GridFS or the temporary file store.

The *Node-Red Flows* can be imported into your existing Node-RED environment and the Connector Profile can be imported into the Agilit-e Admin Portal.

The *.env* file contains a URL for the GridFS upload and a URL for the temporary file upload. Both these URLs should point to your Node-RED environment.

*Note: The Node-RED flows contain Agilit-e Connector nodes, you will need to authenticate with Agilit-e first by using your API-Key in the Agilit-e Connector node's configuration.*

**3. Usage**

Run the following command in the *Terminal* of the project.
```
npm start
```
A browser window or tab should open with the *ReactJS Agilit-e File Upload Demo* App. The app consists of a *Drop Zone* where multiple files or a folder containing files can be added, an *Upload Type* section where you can set the upload type to either store the files with *GridFS* using the *Agilit-e Connector Profile* that was imported or created, or temporary upload the files to the Agilit-e temporary file store. Clicking on the *Upload* button will send the files and relevant meta data to the Node-RED endpoints that will trigger the flow process mentioned above, hence why the *.env* file's URLs need to point to your Node-RED environment.

***
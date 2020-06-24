import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

// Ant Design components and styles
import { Row, Col, Button, message, Table, Card, Radio, Form } from 'antd'
import 'antd/dist/antd.css'

// File Upload Request Method
const uploadMethod = 'post'

function App () {
  // File Data state variable used to store uploaded files in state
  const [filesData, setFilesData] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploadType, setUploadType] = useState(1)

  // Function that gets called when files are added through dropzone
  const onDrop = useCallback((acceptedFiles) => {
    // Show loading icon
    setLoading(true)

    acceptedFiles.forEach((file) => {
      // Instantiate a new instance of the built in FileReader
      // eslint-disable-next-line
      const reader = new FileReader()

      reader.onabort = () => message.warn('File reading was aborted')
      reader.onerror = () => message.error('Unable to read file')

      // onload gets called when FileReader successfully readed a file
      reader.onload = () => {
        // Set the fileData state to contain the new file that was read
        setFilesData((previousData) => [...previousData, { fileName: file.name, fileData: JSON.stringify(Buffer.from(reader.result)), key: Date.now() }])
        setLoading(false)
      }

      // Read the file as an array buffer, 'onload' function will be called once completed
      reader.readAsArrayBuffer(file)
    })
  }, [])

  // Instantiate dropzone component
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // Function that gets triggered when Submit button is clicked
  const upload = () => {
    let uploadUrl = ''

    // Change uploadUrl based on upload type
    switch (uploadType) {
      case 1:
        uploadUrl = process.env.REACT_APP_GRIDFS_UPLOAD_URL
        break
      case 2:
        uploadUrl = process.env.REACT_APP_TEMP_FILES_UPLOAD_URL
        break
      default:
        break
    }

    const config = {
      method: uploadMethod,
      data: filesData,
      headers: { 'Content-Type': 'application/json' },
      url: uploadUrl
    }

    // HTTP request containing files
    axios.request(config)
      .then(res => {
        message.success('Files successfully uploaded')
      })
      .catch(err => {
        console.log(err)
        message.error('Upload unsuccessful')
      })
  }

  // App content that gets rendered
  return (
    <center>
      <Row justify='center'>
        <Col xxl={8}>
          <Card style={{ marginTop: 50 }} title='Upload Files' type='inner'>
            <div style={{ textAlign: 'center', marginBottom: 50, border: '1px dashed gray', paddingTop: 10 }} {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <Table
              columns={[{ title: 'File Name', key: 'fileName', dataIndex: 'fileName' }]}
              pagination={false}
              bordered
              dataSource={filesData}
              loading={loading}
            />
            <Form style={{ marginTop: 30 }}>
              <h4>Upload Type</h4>
              <Form.Item>
                <Radio.Group defaultValue={uploadType} onChange={(e) => { setUploadType(e.target.value) }}>
                  <Radio value={1}>GridFS</Radio>
                  <Radio value={2}>Temporary Files</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
            <Button style={{ marginTop: 10 }} type='primary' onClick={() => upload()}>
              Upload
            </Button>
          </Card>
        </Col>
      </Row>
    </center>
  )
}

export default App

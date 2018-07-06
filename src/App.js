import React, { Component } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Modal,
  Form,
  Upload,
  message,
  Button,
  Icon
} from "antd";
import { Text, Content, Space } from "./components";
import home from "./assets/icons/home.svg";
import Message from "./assets/icons/message.svg";
import user from "./assets/icons/user.svg";
import ai from "./assets/icons/ai.png";
import siit from "./assets/icons/siit.jpg";
import uncheck from "./assets/icons/uncheck.svg";
import "./App.css";
import firebase from "firebase";
import List from "./components/List/List";
import check from "./assets/icons/check.svg";

var config = {
  apiKey: "AIzaSyBtr6wiW7Ti-R6OTNoRaGTMo3SgSHno-z0",
  authDomain: "task-72f77.firebaseapp.com",
  databaseURL: "https://task-72f77.firebaseio.com",
  projectId: "task-72f77",
  storageBucket: "task-72f77.appspot.com",
  messagingSenderId: "687958250053"
};
firebase.initializeApp(config);

const database = firebase.database();

const Search = Input.Search;
const FormItem = Form.Item;
const { TextArea } = Input;

const CollectionCreateForm = Form.create()(
  class App extends Component {
    state = {
      List: [
        {
          id: '1',
          name: "ITS100 Computer Programming Language",
          status: "Completed on 8 May 2017"
        },
        { 
          id: '2',
          name: "ITS101 Data Structure", 
          status: "Semester 2/2017" 
        },
        { 
          id: '3',
          name: "ITS102 C# Programming Language"
        },
        { 
          id: '4',
          name: "ITS103 Java Programming Language" 
        },
        { 
          id: '5',
          name: "Preliminary Research Report" 
        },
        { 
          id: '6',
          name: "Research Proposal" 
        },
        { 
          id: '7',
          name: "Conference Paper1" 
        },
        { 
          id: '8',
          name: "Conference Paper2"
        },
        { 
          id: '9',
          name: "Thesis" 
        },
        { 
          id: '10',
          name: "English Test" 
        },
        { 
          id: '11',
          name: "Graducation Requirements" 
        }
      ],
      otherstate: "default content"
    };
    
    render() {
      const { visible, onCancel, onCreate, form, select } = this.props;
      const { getFieldDecorator } = form;
      const ListArray = this.state.List;
      
      console.log('select: ', select)

      const props = {
        name: "file",
        action: "//jsonplaceholder.typicode.com/posts/",
        headers: {
          authorization: "authorization-text"
        },
        onChange(info) {
          if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
          }
        }
      };
      return (
        <Modal
          visible={visible}
          okText="Save"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <img alt="check" src={check} width={25} />
          {
            (ListArray && ListArray[select])? <List name={ListArray[select].name} key={ListArray[select].id} />: null
          }
          <Text>Fill in the following to complete this task.</Text>
          <Space />
          <Space />
          <Form layout="vertical">
            <FormItem label="Report Title">
              {getFieldDecorator("Report Title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of collection!"
                  }
                ]
              })(<Input placeholder="Report title" />)}
            </FormItem>
            <FormItem label="Section">
              {getFieldDecorator("section")(
                <Input type="textarea" placeholder="Some Section" />
              )}
            </FormItem>
            <Upload {...props}>
              <FormItem label="Files">
                <Button>
                  <Icon type="upload" />Upload file
                </Button>
              </FormItem>
            </Upload>
            <Space />
            <FormItem label="Description">
              {getFieldDecorator("description")(
                <TextArea
                  rows={4}
                  placeholder="Some or more description for this report."
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class App extends Component {
  
  state = {
    visible: false
  };

  showModal = (e) => {
    this.setState({ select: e.target.id, visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    
    const form = this.formRef.props.form;
  
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);

      firebase.database().ref('CourseWorks/1').set(values, function(error) {
        console.error(error)
      });
      //Research
      firebase.database().ref('Reseaches/1').set(values, function(error){
          console.error(error)
      });
      //Graducation Requirements
      firebase.database().ref('Graducation Requirements/1').set(values, function(error){
        console.error(error)
    });
      form.resetFields();
      this.setState({ visible: false });
      alert('Save Success!');
    });

  };
  
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  
  constructor(props) {
    super(props);
    
    database
      .ref()
      .once("value")
      .then(snapshot => {
        const val = snapshot.val();
        console.log(val);
      })
      .catch(e => {
        console.log("Error fetching data", e);
      });
  }
  
  render() {
    return (
      <div>
        <div className="header">
          <a href="#default" class="logo">
            iT
          </a>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200, position: "relative", top: 12, right: -13 }}
          />
          <div className="header-right">
            <a href="#home">
              <img alt="home" src={home} width={30} />{" "}
            </a>
            <a href="#message">
              <img alt="Message" src={Message} width={30} />{" "}
            </a>
            <a href="#user">
              <img alt="user" src={user} width={30} />
            </a>
          </div>
        </div>
        <div className="rectangle" />
        <div className="rectangle2">
          <div className="avartar">
            <img alt="user" src={user} />
          </div>
          <Text type="bold" size="1.5rem" style={{ margin: "5%",alignSelf: "center",position: "relative",left: "-15%" }}>
            Kobkrit Viriyayudhakorn
          </Text>
          <Text type="bold" style={{position: "relative",top: "13%"}}>
            <img alt="siit" src={siit} width={50} /> Sirindhorn International
            Institute of Science
            <Space /><Space />
            <img alt="ai" src={ai} width={40} /> Embedded System
          </Text>
        </div>

        <Content textAlign="left" margin="5%">
          <div style={{ background: "#9b9b9b", padding: "30px" }}>
            <Row gutter={16}>
              <Col span={8} style={{ padding: "0.5%" }}>
                <Text type="bold" size="1rem" color="white" style={{position: "relative",top: "-25px"}}>
                  Your Dashboard
                </Text>
                <Card bordered={false}>
                  <Text size="1.7rem" color="#4a90e2">
                    23
                  </Text>
                  <Space />
                  <Text>tasks left</Text>
                </Card>
              </Col>
              <Col span={8} style={{ padding: "0.6%" }}>
                <Space />
                <Card bordered={false}>
                  <Text size="1.7rem" color="#4a90e2">
                    80%
                  </Text>
                  <Space />
                  <Text>tasks done</Text>
                </Card>
              </Col>
              <Col span={8}>
                <Text type="bold" size="1.2rem" color="white" style={{position: "relative",top: "-25px"}}>
                  Excellent Progress
                </Text>
                <Card bordered={false}>
                  <Text size="1.7rem" color="#4a90e2">
                    150
                  </Text>
                  <Space />
                  <Text>days left</Text>
                </Card>
              </Col>
            </Row>
          </div>
          <Card>
            <p
              style={{
                fontSize: 20,
                color: "rgba(0, 0, 0, 0.85)",
                marginBottom: 16,
                fontWeight: 500
              }}
            >
              Course works
            </p>
            <Card type="inner" style={{ borderColor: "white" }}>
              <img onClick={this.handleCreate} alt="check" src={check} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={0}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}

              >
                ITS100 Computer Programming Language
              </Text>
              <Space />
              Completed on 8 May 2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={1}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                ITS101 Data Structure
              </Text>
              <Space />
              Semester 2/2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={2}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                ITS102 C# Programming Language
              </Text>
              <Space />
              Semester 2/2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={3}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                ITS103 Java Programming Language
              </Text>
              <Space />
              Semester 2/2017
            </Card>
          </Card>
          <Space />
          <Card>
            <p
              style={{
                fontSize: 20,
                color: "rgba(0, 0, 0, 0.85)",
                marginBottom: 16,
                fontWeight: 500
              }}
            >
              Reseaches
            </p>
            <Card type="inner" style={{ borderColor: "white" }}>
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={4}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                Preliminary Research Report
              </Text>
              <Space /> Completed on 8 May 2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={5}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                Research Proposal
              </Text>
              <Space />
              Completed on 11 May 2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={6}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                Conference Paper1
              </Text>
              <Space />
              Completed on 12 May 2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={7}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                Conference Paper2
              </Text>
              <Space />
              Semester 2/2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={8}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
                
              >
                Thesis
              </Text>
              <Space />
              Semester 2/2017
            </Card>
          </Card>
          <Space />
          <Card>
            <p
              style={{
                fontSize: 20,
                color: "rgba(0, 0, 0, 0.85)",
                marginBottom: 16,
                fontWeight: 500
              }}
            >
              Graducation Requirements
            </p>
            <Card type="inner" style={{ borderColor: "white" }}>
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={9}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                English Test
              </Text>
              <Space /> Completed on 8 May 2017
            </Card>
            <Card style={{ marginTop: 16, borderColor: "white" }} type="inner">
              <img alt="uncheck" src={uncheck} width={15} />{" "}
              <Text
                size="1rem"
                type="bold"
                id={10}
                onClick={this.showModal}
                style={{ cursor: "pointer" }}
              >
                Graduation Grown Photo
              </Text>
              <Space />
              Completed on 8 May 2017
            </Card>
          </Card>

          {/* footer */}
          <div className="footer">
            <p>footer@2018</p>
          </div>
        </Content>

        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          select={this.state.select}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default App;

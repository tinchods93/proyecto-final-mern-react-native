import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
import {actions} from '../store';
import {connect} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {commonStyles} from '../styles/mainStyles';

const {height, width} = Dimensions.get('window');

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      index: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('selectedPost')
      .then(response => {
        const resp = JSON.parse(response);
        this.setState({data: resp.item, index: resp.index});
      })
      .catch(e => console.log('Error en Post Details', e));
  }

  render() {
    const {data, index} = this.state;
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <Text
            style={{...commonStyles.title, color: '#FFF', fontWeight: 'bold'}}>
            Edit Post
          </Text>
          <View style={styles.inputBox}>
            <Text style={styles.titleText}>Title:</Text>
            <TextInput
              style={styles.input}
              value={data.title}
              multiline={true}
              onChangeText={input =>
                this.setState({data: {...data, title: input}})
              }
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.titleText}>Body: </Text>
            <TextInput
              style={styles.input}
              value={data.body}
              multiline={true}
              onChangeText={input =>
                this.setState({data: {...data, body: input}})
              }
            />
          </View>
          <TouchableOpacity
            style={commonStyles.primaryBtn}
            onPress={() => {
              this.props.updatePost({data, index});
              this.props.navigation.navigate('Posts');
            }}>
            <Text style={commonStyles.primaryBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#FFF',
    width: width * 0.9,
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    backgroundColor: '#E3E6EA',
    borderRadius: 10,
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const mapDispatchToProps = dispatch => ({
  updatePost: data => dispatch(actions.posts.updatePost(data)),
});
const mapStateToProps = state => ({
  posts: state.posts.posts,
});
export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
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
import { actions } from '../store';
import { connect } from 'react-redux';
import {
  placesSelector,
  selectedSelector
} from '../store/selectors/places';

import {commonStyles} from '../styles/mainStyles';

const {height, width} = Dimensions.get('window');

class PlaceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        body: '',
      },
    };
  }

  render() {
    const {data} = this.state;
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.views}>
          <Text
            style={{...commonStyles.title, color: '#FFF', fontWeight: 'bold'}}>
            New Post
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
              this.props.createPost(data);
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
  createPost: data => dispatch(actions.posts.createPost(data)),
});
const mapStateToProps = state => ({
  places: placesSelector(state),
  selected: selectedSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCreate);

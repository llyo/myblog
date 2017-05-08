import alt from '../alt';
import EditorActions from '../actions/EditorActions';

class EditorStore {
  constructor() {
    this.bindActions(EditorActions);
    this.title = '';
    this.abstract = '';
    this.tags = '';
    this.category = '随笔';
    this.articleState = 1;
    this.btnState = false;
    this.helpBlockTitle = '';
    this.helpBlockAbstract = '';
    this.helpBlockTags = '';
  }

  onEditorSuccess(successMessage) {
  }

  onEditorFail(errorMessage) {
  }

  onUpdateTitle(event) {
    this.title = event.target.value;
  }

  onUpdateAbstract(event) {
    this.abstract = event.target.value;
  }

  onUpdateTag(event) {
    this.tags = event.target.value;
  }
  
  onUpdateCategory(event) {
    this.category = event.target.innerText;
  }

  onUpdateState(event) {
    let el = event.target;
    this.articleState = el.value;
  }

  onSetDisabled(val) {
    this.btnState = val;
  }

  onSetDefault() {
    this.constructor();
    CKEDITOR.instances['editor'].setData('');
  }

  onCheckValue() {
    var reVal = false;
    (this.title != '' ? this.helpBlockTitle = '' : (this.helpBlockTitle = '不能为空！', false)) &&
    (this.abstract != '' ? this.helpBlockAbstract = '' : (this.helpBlockAbstract = '不能为空！', false)) &&
    (this.tags != '' ? this.helpBlockTags = '' : (this.helpBlockTags = '不能为空！', false)) && 
    (reVal = true);
    console.log(this.helpBlockTitle);
    return reVal;
  }
}

export default alt.createStore(EditorStore);
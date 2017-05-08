import React from 'react';
import { Link } from 'react-router';
import _ from 'underscore';
import EditorActions from '../actions/EditorActions';
import EditorStore from '../stores/EditorStore';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = EditorStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EditorStore.listen(this.onChange);
    CKEDITOR.replace('editor');
  }

  componentWillUnmount() {
    EditorStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit() {
    let param = _.extend(
      _.pick(
        this.state,
        'title',
        'abstract',
        'tags',
        'category',
        'articleState'),
      {
        content: CKEDITOR.instances['editor'].getData()
      }
    );
    EditorActions.checkValue() && EditorActions.saveArticle(param);
  }

  handleSelect(event) {
    // console.log(event.target.innerText)
    EditorActions.updateCategory(event);
  }

  render() {
    return (
      <div className="editor-container">
        <div className="content">
          <div className="content-title">

          </div>
          <form className='form-horizontal'>
            <div className='form-group'>
              <label className='col-md-2 control-label'>标题</label>
              <div className='col-md-8'>
                <input type='text' className='form-control' ref='titleTextField' onChange={EditorActions.updateTitle} value={this.state.title} autoFocus placeholder='请输入文章标题'/>
              </div>
              <span className='help-block col-md-1'>{this.state.helpBlockTitle}</span>
            </div>
            <div className='form-group'>
              <label className='col-md-2 control-label'>简述</label>
              <div className='col-md-8'>
                <input type='text' className='form-control col-md-4' ref='abstractTextField' onChange={EditorActions.updateAbstract} value={this.state.abstract} placeholder='输入一段简述性文字'/>
              </div>
              <span className='help-block col-md-1'>{this.state.helpBlockAbstract}</span>
            </div>
            <div className='form-group'>
              <label className='col-md-2 control-label'>标签</label>
              <div className='col-md-8'>
                <input type='text' className='form-control' ref='tagTextField' onChange={EditorActions.updateTag} value={this.state.tags} placeholder='文章对应的标签'/>
              </div>
              <span className='help-block col-md-1'>{this.state.helpBlockTags}</span>
            </div>
            <div className='form-group'>
              <label className='col-md-2 control-label'>类别</label>
              <div className='col-md-8'>
                <div className="dropdown">
                  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {this.state.category}
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><span className='dropdown-span' onClick={this.handleSelect.bind(this)}>随笔</span></li>
                    <li><span className='dropdown-span' onClick={this.handleSelect.bind(this)}>项目实验</span></li>
                    <li><span className='dropdown-span' onClick={this.handleSelect.bind(this)}>技术小结</span></li>
                  </ul>
                </div>
              </div>
            </div> 
            <div className='form-group'>
              <label className='col-md-2 control-label'>是否显示</label>
              <div className='col-md-8'>
                <div className='radio radio-inline'>
                  <label>
                    <input type='radio' name='articleState' id='show' value='1' onChange={EditorActions.updateState} checked={this.state.articleState == 1} />
                    显示
                  </label>
                </div>
                <div className='radio radio-inline'>
                  <label>
                    <input type='radio' name='articleState' id='hide' value='0' onChange={EditorActions.updateState} checked={this.state.articleState == 0}/>
                    不显示
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-1 col-md-10">
                <textarea id="editor" className="form-control"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-1 col-md-10">
                <input type='button' ref='submit' className='btn btn-primary' disabled={this.state.btnState} value='提交' onClick={this.handleSubmit.bind(this)} />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Editor;
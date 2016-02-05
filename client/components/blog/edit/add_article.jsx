class AddArticle extends React.Component{
    constructor(props){
        super();
        this.state = {
            formState:'initial',
            errMessage:''
        };

        this.requireMessage = "Fielld $s must be required";
    }

    inputRequire(e){
        let title = e.target.title.value;
        let text = e.target.text.value;
        if(title === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Title')); return false} ;
        if(text === '') {this.setFormState('error',this.requireMessage.replace('$s', 'Text')); return false};
        if(document.getElementById('tittle-image').files.length !== 1)
            {this.setFormState('error',this.requireMessage.replace('$s', 'Title Image')); return false};
        return true;
    }
    handleClick(e){
        e.preventDefault();
        let  self = this;
        // Require all inputs
        if(!this.inputRequire(e)) return;

        self.setFormState('loading');

        let opt = {
            title: e.target.title.value,
            text: e.target.text.value
        };
        let file = document.getElementById('tittle-image').files[0];
        let files = document.getElementById('article-images').files;

        Images.insert(file, function (err, fileObj) {
            console.log('-> Insert title Image id[' +fileObj._id+ ']');
            opt.fotoId = fileObj._id;
            Meteor.call('addArticle',opt,(err,res) => {
                console.log('-> Create article id[' +res+ ']');
                if(err){
                    self.setState({formState:'error'});
                    self.setState({errMessage:err.message});
                }else{
                    for (var i = 0, ln = files.length; i < ln; i++) {
                        Images.insert(files[i], function (err, fileObj) {
                            console.log('-> Insert Image id[' +fileObj._id+ ']');
                            Meteor.call('setImageToArticle',res,fileObj._id,(err,res) => {
                                console.log('-> Update article');
                                if(err) Materialize.toast(err.message, 4000);
                            });
                        });
                    }
                    Materialize.toast('Article was success added!', 4000);
                    self.setFormState('done');
                    console.log('-> Router go');
                    FlowRouter.go('/');
                }
            });
        });

    }
    setFormState(state,errMessage = ''){
        this.setState({
            formState:state,
            errMessage:errMessage
        });
    }
    render(){
        let submitIconName = '';
        let submitColor = '';
        switch (this.state.formState){
            case 'initial':{
                submitIconName = "play_arrow";
                break;
            }
            case 'loading':{
                submitIconName = "loop";
                break;
            }
            case 'done':{
                submitIconName = "done";
                break;
            }
            case 'error':{
                submitIconName = "error_outline";
                submitColor = 'pink'
                break;
            }
        }
        return (
            <div className="row">
                <form className="col s8 offset-s2 card-panel" onSubmit={ this.handleClick.bind(this) }>
                    <div className="row">
                        <div className="col s12">
                            <h3>Add new Article</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <span className="pink-text text-darken-2">{ this.state.errMessage }</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <C.Form.Input label="Title" id="title" name="title" type="text"   />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <C.Form.TextArea label="Text" id="text" name="text" type="text" iconName="mode_edit" counter="120"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <C.Form.File label="Title Image" id="tittle-image" name="tittleImage" placeholder="Brows image"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <C.Form.File label="Images" id="article-images" name="articleImage" placeholder="Brows image" multiple="true"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s2 m4 offset-s10 offset-m8">
                            <button className={ "waves-effect waves-light btn " + submitColor} type="submit"> <i className="material-icons right">{ submitIconName }</i>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
this.C.AddArticle = AddArticle;

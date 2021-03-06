import * as React from 'react';

import IEditorProps, {IEditorState} from "./IEditor";
import editorMap from './editorMap';

export default class ObjectEditor extends React.Component<IEditorProps, IEditorState>{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, newValue) {
        this.props.onChange({...this.props.value, [key]: newValue});
    }

    render() {
        const properties = this.props.schema.properties;
        const propertyKeys: any = Object.keys(properties);
        return <div>
            {propertyKeys.map((property: string) => {
                const EditorComponent = editorMap(properties[property].type);
                const value = this.props.value ? this.props.value[property] : '' ;

                return <EditorComponent
                    schema={properties[property]}
                    label={property}
                    value={value}
                    onChange={(value) => this.handleChange(property, value)}
                />;
            })}
        </div>
    }
}
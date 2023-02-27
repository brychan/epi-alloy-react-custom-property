using EPiServer.Shell.ObjectEditing;
using EPiServer.Shell.ObjectEditing.EditorDescriptors;

namespace Alloy.Business.EditorDescriptors;

/// <summary>
/// Registers an editor that displays a To Do list UI and saves the data as a JSON string
/// </summary>
[EditorDescriptorRegistration(
    TargetType = typeof(String),
    UIHint = "todolist")]
public class ToDoListAttribute : EditorDescriptor
{
    public override void ModifyMetadata(ExtendedMetadata metadata, IEnumerable<Attribute> attributes)
    {
        ClientEditingClass = "custom/Editors/ToDoList";

        metadata.EditorConfiguration["editorProps"] = new
        {
            Test = "Test"
        };

        base.ModifyMetadata(metadata, attributes);
    }

}

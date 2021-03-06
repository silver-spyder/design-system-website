## Effective form design

All forms are comprised of 5 elements:

* **Labels:** Inform users what the corresponding input fields mean.
* **Input fields:** Enable users to provide information. Information can be entered through a variety of different input fields ranging from text fields, checkboxes, and many other types.
* **Placeholder text:** Provides assistance on how to fill out a field.
* **Actions:** Allow users to submit a form.
* **Validation:** Ensures the data submitted by the user conforms to acceptable parameters.

![effective form design](images/form-usage-1.png)

## Form logic

* **Radio Buttons** are used when there is a list of two or more options that are mutually exclusive and the user must select exactly one choice. In other words, clicking a non-selected radio button will deselect whatever other button was previously selected in the list.
* **Checkboxes** are used when there are lists of options and the user may select any number of choices, including zero, one, or several. In other words, each checkbox is independent of all other checkboxes in the list, so checking one box doesn’t uncheck the others. A stand-alone checkbox, or a toggle can be used for a single option that the user can turn on or off.
* For fields in which a single selection is required and there are a large number of possible options, consider using a **Select** element.

![form logic](images/form-usage-4.png)

## General guidelines

### Keep it short

Be as concise as possible when designing forms. Think about each field and what value the data will provide. What do you gain by collecting this information?

**Begin by asking:**

* Is this a piece of information that is valuable to us?
* Is this a piece of information that is so valuable that it's worth preventing the user from continuing if they choose not to provide it?

## Validation and errors

### Error messaging

Effective error messaging can help the user to understand the problem and how to fix it. First, inform the user what has happened, then provide guidance on next steps or possible resolutions. [Inline Notifications](/components/notification) can be used to state the general problem with the users input, such as _“Please input the required fields.”_ Inline Notifications can occur pre or post submission, depending on the type of data the user is inputting.

![Inline notification on forms](images/form-usage-2.png)
_Inline Notification for error messaging_

### Form validation

We recommend validating the users data before form submission. Use visual cues to guide the user as to where the problem lies within the form. This will help to easily identify the elements that need to be corrected.

The validation should appear when the user has clicked away from the text field. Once the user corrects the errors within the text field, the validation should disappear once the data is rendered as valid.

The validation label below the field should be as informative as possible when describing the issue with the users data. For example, if password limitations require 16 characters, but the user inputs a password with only six characters, the text should read something like, _"Password must be at least 16 characters."_

![form validation](images/form-usage-3.gif)
_Form validation_

### Optional vs. required fields
All fields in a form are assumed required, with optional fields being tagged as so.

![optional fields in a form](images/form-usage-5.png)
_Denote optional fields within a Form_

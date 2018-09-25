# Build An Alexa Play-with-Mariam Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

This Alexa template enable developer to easily implement a dynamic content Skill. And event after publishing the Skill he can still modify and maintain the skill content without need to change in Alexa model or Lambda code. This skill depend on data saved in DynamoDB table. You can configure every thing inside the database. voice tone, images that will appear in Alexa cards, Alexa reply in case user need help, order of conversation, different content every session,... etc  
Each time user lunch the skill, skill will pic a different story from database and Lambda code will control dialogue with user using the story parts.

<!-- commenting this out temporariliy
If you would like to see an example of this skill in action, you can enable the [Gloucester Facts](https://www.amazon.com/Robert-McCauley-Gloucester-Facts/dp/B01I5MOIA2/) from the [Alexa Skill Store](http://amazon.com/skills).
-->

To **Get Started** click the button below:

[![Get Started](https://camo.githubusercontent.com/db9b9ce26327ad3bac57ec4daf0961a382d75790/68747470733a2f2f6d2e6d656469612d616d617a6f6e2e636f6d2f696d616765732f472f30312f6d6f62696c652d617070732f6465782f616c6578612f616c6578612d736b696c6c732d6b69742f7475746f7269616c732f67656e6572616c2f627574746f6e732f627574746f6e5f6765745f737461727465642e5f5454485f2e706e67)](./instructions/1-voice-user-interface.md)

Or click [here](./instructions/7-cli.md) for instructions using the ASK CLI (command line interface).

## How to fill the Database

1- **StoriesTable**
<table class="tg">
  <tr>
    <th class="tg-yw4l"><b>Field</b></th>
    <th class="tg-yw4l"><b>Type</b></th>
    <th class="tg-yw4l"><b>Mandatory</b></th>
    <th class="tg-yw4l"><b>Description</b></th>
    <th class="tg-yw4l"><b>Example</b></th>
  </tr>
  <tr>
    <td class="tg-yw4l">pkStoryID</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Represent the a unique story number. When Alexa skill start it pick a random story.</td>
    <td class="tg-yw4l">2</td>
  </tr>
  <tr>
    <td class="tg-yw4l">firstPartID</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Point to this story first story in parts table</td>
    <td class="tg-yw4l">40</td>
  </tr>
</table>



2- **StoryPartsTable**
Each story part can be a question that user need to answer to move the next part, or user should select between 2 choices and based on his selection the next parts will be different  

<table class="tg">
  <tr>
    <th class="tg-yw4l"><b>Field</b></th>
    <th class="tg-yw4l"><b>Type</b></th>
    <th class="tg-yw4l"><b>Mandatory</b></th>
    <th class="tg-yw4l"><b>Description</b></th>
    <th class="tg-yw4l"><b>Example</b></th>
  </tr>

  <tr>
    <td class="tg-yw4l">pkStoryID</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Represent the story number.</td>
    <td class="tg-yw4l">2</td>
  </tr>
  <tr>
    <td class="tg-yw4l">skPartID</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Represent the a unique part ID.</td>
    <td class="tg-yw4l">40</td>
  </tr>
  <tr>
    <td class="tg-yw4l">lastPart</td>
    <td class="tg-yw4l">Number 0 or 1</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">1 means last part in this story. Alexa will end the conversation. 0 means, user input is expected.</td>
    <td class="tg-yw4l">0</td>
  </tr>
  <tr>
    <td class="tg-yw4l">partType</td>
    <td class="tg-yw4l">Number 1 or 2</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">1 means Choice part so based on user choice sequance of parts will differ. 2 means Question part.</td>
    <td class="tg-yw4l">1</td>
  </tr>

  <tr>
    <td class="tg-yw4l">speechOutput</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Alexa will say this text. You can use SSML.</td>
    <td class="tg-yw4l"><prosody rate=\"medium\"> Today is first day <break time=\"1s\"/> in school after summer vacation. </prosody></td>
  </tr>
  <tr>
    <td class="tg-yw4l">repromptSpeech</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Text without SSML tags</td>
    <td class="tg-yw4l">first day</td>
  </tr>

  <tr>
    <td class="tg-yw4l">cardTitle</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Title of the Card</td>
    <td class="tg-yw4l">Guess the Country Name</td>
  </tr>
  <tr>
    <td class="tg-yw4l">cardContent</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Card Content</td>
    <td class="tg-yw4l">Country of Eiffel Tower</td>
  </tr>
  <tr>
    <td class="tg-yw4l">largeImageUrl</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Card large Image. Ensure to follow Alexa requirements in image</td>
    <td class="tg-yw4l">https://....</td>
  </tr>
  <tr>
    <td class="tg-yw4l">smallImageUrl</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Card small Image. Ensure to follow Alexa requirements in image</td>
    <td class="tg-yw4l">https://....</td>
  </tr>

  <tr>
    <td class="tg-yw4l">option1PartID</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes if part type = 1</td>
    <td class="tg-yw4l">In case user select this option. This will be the ID that Alexa will move to it next</td>
    <td class="tg-yw4l">4</td>
  </tr>
  <tr>
    <td class="tg-yw4l">option1Type</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes if part type = 1</td>
    <td class="tg-yw4l">This equivalents to categories Alexa will support whatever it is default such as list of countries or custom list of values. Value will be determined based on Configuration.js file inside Lambda and Developer implementation</td>
    <td class="tg-yw4l">4</td>
  </tr>
  <tr>
    <td class="tg-yw4l">option1Answer</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Yes if part type = 1</td>
    <td class="tg-yw4l">Alexa will match user input with this value to detect if user want this option or the 2nd option</td>
    <td class="tg-yw4l">Country Name</td>
  </tr>

  <tr>
    <td class="tg-yw4l">option2PartID</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes if part type = 1</td>
    <td class="tg-yw4l">In case user select this option. This will be the ID that Alexa will move to it next</td>
    <td class="tg-yw4l">4</td>
  </tr>
  <tr>
    <td class="tg-yw4l">option2Type</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes if part type = 1</td>
    <td class="tg-yw4l">This equivalents to categories Alexa will support whatever it is default such as list of countries or custom list of values. Value will be determined based on Configuration.js file inside Lambda and Developer implementation</td>
    <td class="tg-yw4l">4</td>
  </tr>
  <tr>
    <td class="tg-yw4l">option2Answer</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Yes if part type = 1</td>
    <td class="tg-yw4l">Alexa will match user input with this value to detect if user want this option or the 1st option</td>
    <td class="tg-yw4l">Country Name</td>
  </tr>


  <tr>
    <td class="tg-yw4l">targetAnswerNextPart</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes if part type = 2</td>
    <td class="tg-yw4l">if user ansewer the question correctly, Alexa will move to part with this ID</td>
    <td class="tg-yw4l">4</td>
  </tr>
  <tr>
    <td class="tg-yw4l">targetAnswerType</td>
    <td class="tg-yw4l">Number</td>
    <td class="tg-yw4l">Yes if part type = 2</td>
    <td class="tg-yw4l">This equivalents to categories Alexa will support whatever it is default such as list of countries or custom list of values. Value will be determined based on Configuration.js file inside Lambda and Developer implementation</td>
    <td class="tg-yw4l">4</td>
  </tr>
  <tr>
    <td class="tg-yw4l">targetAnswer</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Yes if part type = 2</td>
    <td class="tg-yw4l">Alexa will match user input with this value to detect if user correctly answer the question or not</td>
    <td class="tg-yw4l">France</td>
  </tr>


  <tr>
    <td class="tg-yw4l">hintSpeechOutput</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Alexa will say this text when user give wrong answer to help him. You can't use SSML here.</td>
    <td class="tg-yw4l">As a hint, it is Capital is Paris. You can Google it if you don’t know. What is the Country Name?</prosody></td>
  </tr>
  <tr>
    <td class="tg-yw4l">hintRepromptSpeech</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Yes</td>
    <td class="tg-yw4l">Alexa will say this text when user give wrong answer to help him</td>
    <td class="tg-yw4l">As a hint, it is Capital is Paris. You can Google it if you don’t know. What is the Country Name?</td>
  </tr>
  <tr>
    <td class="tg-yw4l">hintCardTitle</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Title of the hint Card</td>
    <td class="tg-yw4l">Guess the Country Name</td>
  </tr>
  <tr>
    <td class="tg-yw4l">hintCardContent</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Hint card Content</td>
    <td class="tg-yw4l">Country Capital is Paris</td>
  </tr>
  <tr>
    <td class="tg-yw4l">hintLargeImageUrl</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Hint card large Image. Ensure to follow Alexa requirements in image</td>
    <td class="tg-yw4l">https://....</td>
  </tr>
  <tr>
    <td class="tg-yw4l">hintSmallImageUrl</td>
    <td class="tg-yw4l">String</td>
    <td class="tg-yw4l">Optional</td>
    <td class="tg-yw4l">Hint card small Image. Ensure to follow Alexa requirements in image</td>
    <td class="tg-yw4l">https://....</td>
  </tr>

</table>

## Lambda configuration

1- **Configuration.js** : This file contains all lookup such: part type values, last type value, supported intent types. You can add or modify as you want

2- **aa.js** : don't forget to check TODO comments.

## Additional Resources

### Community
* [Amazon Developer Forums](https://forums.developer.amazon.com/spaces/165/index.html) - Join the conversation!
* [Hackster.io](https://www.hackster.io/amazon-alexa) - See what others are building with Alexa.
* [Devpost](https://devpost.com/) - See what others are building with Alexa.

### Tutorials & Guides
* [Voice Design Guide](https://developer.amazon.com/designing-for-voice/) - A great resource for learning conversational and voice user interface design.
* [Codecademy: Learn Alexa](https://www.codecademy.com/learn/learn-alexa) - Learn how to build an Alexa Skill from within your browser with this beginner friendly tutorial on Codecademy!

### Documentation
* [Official Alexa Skills Kit Node.js SDK](https://www.npmjs.com/package/ask-sdk) - The Official Node.js SDK Documentation
*  [Official Alexa Skills Kit Documentation](https://developer.amazon.com/docs/ask-overviews/build-skills-with-the-alexa-skills-kit.html) - Official Alexa Skills Kit Documentation

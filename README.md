# Build An Alexa Alexa-Nodejs-Dynamic-Content Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

This Alexa template enable developer to easily implement a dynamic content Skill. And event after publishing the Skill he can still modify and maintain the skill content without need to change in Alexa model or Lambda code. This skill depend on data saved in DynamoDB table. You can configure every thing inside the database. voice tone, images that will appear in Alexa cards, Alexa reply in case user need help, order of conversation, different content every session,... etc  
Each time user lunch the skill, skill will pick a different story from database and Lambda code will control dialogue with user using the story parts.

<!-- commenting this out temporariliy
If you would like to see an example of this skill in action, you can enable the [Gloucester Facts](https://www.amazon.com/Robert-McCauley-Gloucester-Facts/dp/B01I5MOIA2/) from the [Alexa Skill Store](http://amazon.com/skills).
-->

To **Get Started** click the button below:

[![Get Started](https://camo.githubusercontent.com/db9b9ce26327ad3bac57ec4daf0961a382d75790/68747470733a2f2f6d2e6d656469612d616d617a6f6e2e636f6d2f696d616765732f472f30312f6d6f62696c652d617070732f6465782f616c6578612f616c6578612d736b696c6c732d6b69742f7475746f7269616c732f67656e6572616c2f627574746f6e732f627574746f6e5f6765745f737461727465642e5f5454485f2e706e67)](./instructions/1-voice-user-interface.md)

Or click [here](./instructions/7-cli.md) for instructions using the ASK CLI (command line interface). Kindly note that The ASK CLI (command line interface) cannot complete this task below and provides only partial completion. Therefore it is better to follow the instructions below, by pressing the ** Getting Started **.


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
2- **app.js** : don't forget to check TODO comments.

## Example
This template is used to build "Play with Mariam" skill which is certified and live. Skill targeting children and its purpose is to teach them new things by engage them in different challenges. Every time child use the skill he will find a different random story, in each story he will be asked different questions and child have to answer those questions to move to next question. And Skill give help to child if he answer wrongly.  

StoriesTable for this skill as the below
<table class="tg">
  <tr>
    <th class="tg-yw4l"><b>pkStoryID</b></th>
    <th class="tg-yw4l"><b>firstPartID</b></th>
    <th class="tg-yw4l"><b>name</b></th>
    <th class="tg-yw4l"><b>target</b></th>
  </tr>
  <tr>
    <td class="tg-yw4l">1</td>
    <td class="tg-yw4l">1</td>
    <td class="tg-yw4l">Grandfather buzzles</td>
    <td class="tg-yw4l">Mathematics challenges.</td>  
  </tr>
  <tr>
    <td class="tg-yw4l">2</td>
    <td class="tg-yw4l">20</td>
    <td class="tg-yw4l">Countries and Flags</td>
    <td class="tg-yw4l">Information about different countries.</td>
  </tr>
  <tr>
    <td class="tg-yw4l">3</td>
    <td class="tg-yw4l">40</td>
    <td class="tg-yw4l">In the Zoo</td>
    <td class="tg-yw4l">Information about animals.</td>
  </tr>
</table>

As the above table, this skill has 3 stories. Every time user use this skill one of those stories will be selected randomly. There is 2 mandatory fields: pkStoryID & firstPartID. Other fields are not used by engine of skill.
As you can see story with ID = 2, will check table StoryPartsTable to find part which has ID = 40.   

<table class="tg">
  <tr>
    <td class="tg-yw4l"><b>pkStoryID</b></td>
    <td class="tg-yw4l">2</td>
    <td class="tg-yw4l"></td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>skPartID</b></td>
    <td class="tg-yw4l">20</td>
    <td class="tg-yw4l"></td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>lastPart</b></td>
    <td class="tg-yw4l">0</td>
    <td class="tg-yw4l">This part is not the last part in story #2</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>partType</b></td>
    <td class="tg-yw4l">1</td>
    <td class="tg-yw4l">Alexa will give user 2 options, and he should choose one of them</td>
  </tr>

  <tr>
    <td class="tg-yw4l"><b>speechOutput</b></td>
    <td class="tg-yw4l"><prosody rate=\"medium\"> Today is first day in school after summer vacation. <break time=\"1s\"/> Mariam is very excited to return back to her friends, teachers and lectures. <break time=\"1s\"/> In her first class, miss Sarah said, <break time=\"1s\"/> Good morning my little heroes, today we will play a small nice game. Game name is Around the world. I’ll choose random students; <break time=\"1s\"/> each student will tell us about a country that he had visited during last summer vacation <break time=\"1s\"/> without telling us the name of the country. <break time=\"1s\"/> Rest of us should guess the country name. <break time=\"1s\"/> Winner will be the one who will correctly answer more questions. <break time=\"1s\"/> Tell me first, do you want to guess the Country name <break time=\"1s\"/> or Country flag color?. </prosody></td>
    <td class="tg-yw4l">This what Alexa will say. You can use Alexa SSML language. User can choose either country or flag</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>repromptSpeech</b></td>
    <td class="tg-yw4l">Today is first day in school after summer vacation. Mariam is very excited to return back to her friends, teachers and lectures. In her first class, miss Sarah said, Good morning my little heroes, today we will play a small nice game. Game name is Around the world. I’ll choose random students; each student will tell us about a country that he had visited during last summer vacation without telling us the name of the country. Rest of us should guess the country name. Winner will be the one who will correctly answer more questions. Tell me first, do you want to guess the Country name or Country flag color?.</td>
    <td class="tg-yw4l"></td>
  </tr>

  <tr>
    <td class="tg-yw4l"><b>cardTitle</b></td>
    <td class="tg-yw4l">Name or Flag</td>
    <td class="tg-yw4l">The title of the card in mobile app</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>cardContent</b></td>
    <td class="tg-yw4l">Country Name or Flag Color ?</td>
    <td class="tg-yw4l">The content of the card in mobile app</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>largeImageUrl</b></td>
    <td class="tg-yw4l">https://.....</td>
    <td class="tg-yw4l">URL for the large image that will be displayed in the Card. Check Alexa requirements in picture sizes and format</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>smallImageUrl</b></td>
    <td class="tg-yw4l">https://.....</td>
    <td class="tg-yw4l">URL for the large image that will be displayed in the Card. Check Alexa requirements in picture sizes and format</td>
  </tr>

  <tr>
    <td class="tg-yw4l"><b>option1PartID</b></td>
    <td class="tg-yw4l">22</td>
    <td class="tg-yw4l">if user select this option, next part will be the part has ID = 22</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>option1Type</b></td>
    <td class="tg-yw4l">4</td>
    <td class="tg-yw4l"> '4' means that we expect user answer to be a string. check Configuration.js to customize values based on your need</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>option1Answer<b></td>
    <td class="tg-yw4l">Country Name</td>
    <td class="tg-yw4l">if user want to select first option he need to say 'Country Name' </td>
  </tr>

  <tr>
    <td class="tg-yw4l"><b>option2PartID</b></td>
    <td class="tg-yw4l">42</td>
    <td class="tg-yw4l">if user select this option, next part will be the part has ID = 42</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>option2Type</b></td>
    <td class="tg-yw4l">4</td>
    <td class="tg-yw4l"> '4' means that we expect user answer to be a string. check Configuration.js to customize values based on your need</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>option2Answer</b></td>
    <td class="tg-yw4l">Flag Color</td>
    <td class="tg-yw4l">if user want to select 2nd option he need to say 'Flag Color' </td>
  </tr>


  <tr>
    <td class="tg-yw4l"><b>targetAnswerNextPart</b></td>
    <td class="tg-yw4l">0</td>
    <td class="tg-yw4l">Not used in this part type</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>targetAnswerType</b></td>
    <td class="tg-yw4l">0</td>
    <td class="tg-yw4l">Not used in this part type</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>targetAnswer</b></td>
    <td class="tg-yw4l">0</td>
    <td class="tg-yw4l">Not used in this part type</td>
  </tr>

  <tr>
    <td class="tg-yw4l"><b>hintSpeechOutput</b></td>
    <td class="tg-yw4l">Choose Game you like, Say either Country Name or Say Flag Color</td>
    <td class="tg-yw4l"></td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>hintRepromptSpeech</b></td>
    <td class="tg-yw4l">Choose Game you like, Say either Country Name or Say Flag Color</td>
    <td class="tg-yw4l"></td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>hintCardTitle</b></td>
    <td class="tg-yw4l">Name or Flag</td>
    <td class="tg-yw4l"></td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>hintCardContent</b></td>
    <td class="tg-yw4l">Say Country Name or Say Flag Color</td>
    <td class="tg-yw4l"></td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>hintLargeImageUrl</b></td>
    <td class="tg-yw4l"></td>
    <td class="tg-yw4l">optional</td>
  </tr>
  <tr>
    <td class="tg-yw4l"><b>hintSmallImageUrl</b></td>
    <td class="tg-yw4l"></td>
    <td class="tg-yw4l">optional</td>
  </tr>

</table>
First part in this story will ask user choose either the country name or flag color, and based on user choice dialogue will move forward.   


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

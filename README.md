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
    <th class="tg-yw4l"><b>Column</b></th>
    <th class="tg-yw4l"><b>Notes</b></th>
    <th class="tg-yw4l"><b>Example</b></th>
  </tr>
  <tr>
    <td class="tg-yw4l">pkStoryID</td>
    <td class="tg-yw4l">Number. Represent the a unique story number. When Alexa skill start it pick a random story.</td>
    <td class="tg-yw4l">2</td>
  </tr>
  <tr>
    <td class="tg-yw4l">firstPartID</td>
    <td class="tg-yw4l">Number. point to this story first story in parts table</td>
    <td class="tg-yw4l">40</td>
  </tr>
</table>

| Column        | Notes                                                                                        | Example  |
| ------------- |:--------------------------------------------------------------------------------------------:| --------:|
| pkStoryID     | Number. Represent the a unique story number. When Alexa skill start it pick a random story.  |    2     |
| firstPartID   | Number. point to this story first story in parts table                                       |    40    |


1- **StoryPartsTable**
| Column        | Notes                                                                               | Example  |
| ------------- |:-----------------------------------------------------------------------------------:| --------:|
| pkStoryID     | Number. Represent the story number.                                                                       |    2     |
| skPartID      | Number. Represent the a unique part ID                                                                    |    40    |
| lastPart      | Number. 1 means last part in this story. Alexa will end the conversation. 0 means, user input is expected.|    0     |
| speechOutput  | String. Alexa will say this text. You can use SSML                                                                          |    <prosody rate=\"medium\"> Today is first day <break time=\"1s\"/> in school after summer vacation. </prosody>    |
| repromptSpeech      | String. Text that will appear in Card                              |    first day    |
| partType      | Number. Can equal 1 or 2. 1 means Choice part so based on user choice sequance of parts will differ. 2 means Question part.                               |    1    |
| option1Answer      | Number. point to this story first story in parts table                              |    40    |
| option1PartID      | Number. point to this story first story in parts table                              |    40    |
| option1Type      | Number. point to this story first story in parts table                              |    40    |
| option2Answer      | Number. point to this story first story in parts table                              |    40    |
| option2PartID      | Number. point to this story first story in parts table                              |    40    |
| option2Type      | Number. point to this story first story in parts table                              |    40    |
| targetAnswer      | Number. point to this story first story in parts table                              |    40    |
| targetAnswerType      | Number. point to this story first story in parts table                              |    40    |
| targetAnswerNextPart      | Number. point to this story first story in parts table                              |    40    |
| cardContent      | Number. point to this story first story in parts table                              |    40    |
| cardTitle      | Number. point to this story first story in parts table                              |    40    |
| largeImageUrl      | Number. point to this story first story in parts table                              |    40    |
| smallImageUrl      | Number. point to this story first story in parts table                              |    40    |
| hintSpeechOutput      | Number. point to this story first story in parts table                              |    40    |
| hintRepromptSpeech      | Number. point to this story first story in parts table                              |    40    |
| hintCardContent      | Number. point to this story first story in parts table                              |    40    |
| hintCardTitle      | Number. point to this story first story in parts table                              |    40    |
| hintLargeImageUrl      | Number. point to this story first story in parts table                              |    40    |
| hintSmallImageUrl      | Number. point to this story first story in parts table                              |    40    |


## Lambda configuration

1- Intent types
2- Part type
3- Last part in story


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

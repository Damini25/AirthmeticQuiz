import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'AirthmeticQuiz';
  quizStarted: Boolean = false;
  operators = ['+', '-', '/', '*'];
  questArray = [];
  currentQuest = {};
  count = 0;
  answerArray = [];
  answerValue: any;
  score = 0;
  totalQuestions = 20;

  /**
 * function call to create Question 
 */
  createArray() {
    const operatorIndex = this.getRandomNumber(0, 4);
    let operator = this.operators[operatorIndex];
    const rNumber1 = this.getRandomNumber(0, 10);
    const rNumber2 = this.getRandomNumber(0, 10);
    const answer = Math.round((eval(rNumber1 + operator + rNumber2)) * 10) / 10;
    const option1 = this.getRandomNumber(11, 20);
    const option2 = this.getRandomNumber(0, 20);
    const option3 = this.getRandomNumber(21, 80);
    const options = [option1, answer, option2, option3];
    const shuffledArr = this.shuffleArray(options);
    this.questArray.push({
      'question': rNumber1 + operator + rNumber2,
      'options': shuffledArr,
      'answer': answer
    });
    this.currentQuest['question'] = rNumber1 + operator + rNumber2;
    this.currentQuest['options'] = shuffledArr;
    this.currentQuest['answer'] = answer;

    this.answerArray.push({
      "question": rNumber1 + operator + rNumber2,
      "answer": answer,
    })
  }

  /**
  * function call to get random number between a range
  */
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * function call on click of next button
   */
  next(currentQuest) {
    this.answerArray[this.count]['userEnteredValue'] = this.answerValue;
    if (this.count <= (this.totalQuestions - 2)) {
      this.createArray();
    }

    if (this.answerArray[this.count]['userEnteredValue'] === this.answerArray[this.count]['answer']) {
      this.score = this.score + 1;
    }
    this.count = this.count + 1;
  }

  shuffleArray(array) {
    var result = [], source = array.concat([]);
    while (source.length) {
      let index = Math.floor(Math.random() * source.length);
      result.push(source.splice(index, 1)[0]);
    }
    return result;
  }

  /**
   * function call on click of Start quiz button
   */
  startQuiz() {
    this.quizStarted = true;
    this.createArray();
  }
}

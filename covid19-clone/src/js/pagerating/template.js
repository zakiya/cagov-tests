export default function (question, yes, no, commentPrompt, thanksFeedback, thanksComments, submit, requiredField, characterLimit, anythingToAdd, positiveSurveyUrl, takeTheSurvey, anyOtherFeedback, negativeSurveyUrl, takeOurSurvey) {
  return /*html*/`<section aria-label="Feedback">
  <div class="feedback-form">
    <div class="feedback-form-grid">
				<div class="feedback-form-grid-col" id="yes-no">
          <div class="js-feedback-form">
          <h3 class="feedback-form-label mt-0 mb-3 font-size-1-5em" id="feedback-rating">${question}</h3>
          <button class="button-lightestblue mr-2 js-feedback-yes" id="feedback-yes">${yes}</button>
          <button class="button-lightestblue ml-3 js-feedback-no" id="feedback-no">${no}</button>
          </div>
          <div class="feedback-form-thanks js-feedback-thanks" role="alert"><span class="font-size-1-5em bold mb-3">${thanksComments}</span>
          <br><span class="text-300">${anythingToAdd} <a href="${positiveSurveyUrl}?page=${window.location.toString()}" class="color-secondary color-secondary-hover">${takeTheSurvey}.</a></span></div>
        </div>
        <div class="col-md-6 mx-auto d-none" id="feedback-form">
          <div class="feedback-form-add text-center">
            <label class="feedback-form-label js-feedback-field-label font-size-1-5em" for="add-feedback">${commentPrompt}</label>
            <div class="feedback-form-add-grid d-block">
              <textarea name="add-feedback" class="js-add-feedback feedback-form-textarea" id="add-feedback" rows="1"></textarea>
              <div class="feedback-form-error feedback-error color-yellow" role="alert">${requiredField}</div>
              <div class="feedback-form-error feedback-limit-error color-yellow" role="alert">${characterLimit}</div>
            </div>
            <button class="button-lightestblue mt-4 mx-auto js-feedback-submit" type="submit" id="feedback-submit">${submit}</button>
          </div>
          <div class="feedback-form-thanks feedback-thanks-add" role="alert">
            <span class="font-size-1-5em bold">${thanksFeedback}</span>
            <p class="text-300  mt-3">${anyOtherFeedback} <a href="${negativeSurveyUrl}?page=${window.location.toString()}" class="color-secondary color-secondary-hover js-feedback-survey-link">${takeOurSurvey}.</a></p>
          </div>
				</div>
		  </div>
    </div>
    </section>`
}
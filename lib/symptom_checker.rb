class SymptomChecker
  def initialize(response)
    @response = response
  end

  def find_symptoms
    diagnosis_1
  end

private

  def male_19
    @response.check_answer("Sex", "male") \
    && @response.check_answer("Age", "19")
  end

  def female_28
    @response.check_answer("Sex", "female") \
    && @response.check_answer("Age", "28")
  end

  def diagnosis_1
    (@response.answer_value("Age") >= 50 ) \
    && (@response.check_answer("Onset of symptoms", "> 1 month") || @response.check_answer("Onset of symptoms", "> 3 months")) \
    && @response.check_answer("Regularity of symptoms", "intermittent") \
    && @response.check_answer("Morning pain or stiffness", "> 60 mins") \
    && (@response.count_answers("Articulations of head, neck and cervical and thoracic spine") >= 3)
  end

end



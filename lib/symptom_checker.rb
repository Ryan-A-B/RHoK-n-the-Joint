class SymptomChecker
  def initialize(response)
    @response = response
  end

  def find_symptoms
    diagnostic_criteria_possible_ra \
    || diagnostic_criteria_possible_oa
  end

private

  def diagnostic_criteria_possible_ra
    (@response.answer_value("Age") <= 50 ) \
    && (@response.check_answer("Onset of symptoms", "> 1 Month") || @response.check_answer("Onset of symptoms", "> 3 Months")) \
    && @response.check_answer("Regularity of symptoms", "Intermittent") \
    && @response.check_answer("Morning pain or stiffness", "> 60 mins") \
    && (@response.count_answers("Articulations of the upper limb") >= 2)
  end

  def diagnostic_criteria_possible_oa
    (@response.answer_value("Age") >= 50 ) \
    && @response.check_answer("Onset of symptoms", "> 3 Months") \
    && @response.check_answer("Regularity of symptoms", "Persistent") \
    && @response.check_answer("Morning pain or stiffness", "< 30 mins") \
    && (@response.check_answer("Articulations of the upper limb", "Elbow joint articulations") || @response.check_answer("Articulations of the upper limb", "Articulations of the digits"))
  end

end


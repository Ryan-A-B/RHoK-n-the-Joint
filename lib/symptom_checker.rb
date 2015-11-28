class SymptomChecker
  def initialize(response)
    @response = response
  end

  def find_symptoms
       male_19 \
    || female_28
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

end

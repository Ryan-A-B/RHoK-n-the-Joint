class Response
  def initialize(response)
    @response = response
  end

  def check_answer(question_description, answer_value)
    question = find_question_by_description(question_description)
    find_answer_by_value(question, answer_value)
  end

  private

  def find_question_by_description(string)
    @response["questions"].select {|question| question["description"] == string }.first
  end

  def find_question_by_id(id)
    @response["questions"].select {|question| question["id"] == id }.first
  end

  def find_answer_by_value(question, value)
    question["answers"].select {|answer| answer["value"] == value}.first
  end

  def find_answer_by_id(question, id)
    question["answers"].select {|answer| answer["id"] == id}.first
  end
end

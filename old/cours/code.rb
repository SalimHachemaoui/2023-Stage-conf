def valid?(value)
    result = JSON.parse(value)

    result.is_a?(Hash) || result.is_a?(Array)
  rescue JSON::ParserError, TypeError
    false
end

json_fields.each do |field|
    if valid?(event.get(field))
      parsed_field = JSON.parse(event.get(field))
      if (parsed_field.is_a?(Hash) || parsed_field.is_a?(Array))
        event.set(field, parsed_field)
      else
        event.remove(field)
      end
    else
      event.remove(field)
    end
  end


field_value = event.get("cdm_cours_16_instructionlanguage")

if field_value.nil? || field_value == "null"
    event.remove(field)
    next
end

if field_value.is_a?(String) && field_value.start_with?("\"") && field_value.end_with?("\"")
  field_value = field_value.delete_prefix("\"").delete_suffix("\"")
end


if !field_value.is_a?(Hash)
  tmp = JSON[JSON.parse(field_value)]
  event.set("cdm_cours_16_instructionlanguage", [tmp["lang"]])
end


tmp = {
  'price' => 1,
  'currency' => [2,3]
}

JSON[tmp]


field_value = event.get("cdm_cours_16_instructionlanguage")

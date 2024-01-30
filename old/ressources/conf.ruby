				json_fields = [
					#Ressources
					"lom_1_2_title",
					"lom_1_5_keyword",
					"lom_1_9_documentType",
					"lom_2_3_contribute",
					"lom_4_3_location",
					"lom_5_6_context",

					"lom_1_4_description",
					"lom_1_6_coverage",
					"lom_1_7_structure",
					"lom_1_8_aggregationLevel",
					"lom_1_10_generalResourceType",
					"lom_2_1_version",
					"lom_2_2_status",
					"lom_3_1_identifier",
					"lom_3_2_contribute",
					"lom_3_3_metadataSchema",
					"lom_3_4_language",
					"lom_4_1_format",
					"lom_4_4_requirement",
					"lom_4_5_installationRemarks",
					"lom_4_6_otherPlatformRequirements",
					"lom_5_1_activiteType",
					"lom_5_2_learningResourceType",
					"lom_5_5_intendedEndUserRole",
					"lom_5_7_typicalAgeRange",
					"lom_5_8_difficulty",
					"lom_5_10_description",
					"lom_5_11_language",
					"lom_5_12_activity",
					"lom_5_13_credit",
					"lom_5_14_place",
					"lom_5_15_educationalMethod",
					"lom_5_16_tool",
					"lom_6_1_cost",
					"lom_6_2_copyrightAndOtherRestrictions",
					"lom_6_3_description",
					"lom_7_relation",
					"lom_8_annotation",
					"lom_9_classification"
				]


					json_fields.each do |field|
							field_value = event.get(field)
							if field_value.nil? || field_value == "null"
									event.remove(field)
									next
							end
							if field_value.is_a?(String) && field_value.start_with?("\"") && field_value.end_with?("\"")
									field_value = field_value.delete_prefix("\"").delete_suffix("\"")
							end
							if !field_value.is_a?(Hash) && !field_value.is_a?(Array)
									begin
											parsed_field = JSON.parse(field_value)
											if (parsed_field.is_a?(Hash) || parsed_field.is_a?(Array))
													event.set(field, parsed_field)
											else
													event.remove(field)
											end
									rescue JSON::ParserError => e
											event.remove(field)
									end
							end
					end

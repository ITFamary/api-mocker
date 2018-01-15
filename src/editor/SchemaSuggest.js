// vendorExtension
// response
// jsonReference
const clone = require('clone');

/**
 * 调整参数范围
 * @param name 参数名称
 * @param store 这个参数的原位置
 */
function make__script(name,store) {
    const oldValue = store[name];
    store[name] = {
        "oneOf":[
            {
                "$ref":"#/definitions/__scriptObject"
            }
        ]
    };
    store[name].oneOf.push(oldValue);
}

// noinspection JSUnusedGlobalSymbols
export const SchemaSuggest = {
    forSwagger: function (schema) {
// 版本声明
        schema.properties.swagger.enum.push("2.0-with-api-mocker-1.0");

        // 可条件的脚本
        schema.definitions.__scriptObject= {
            "type": "object",
            "required": [
                "__script"
            ],
            "additionalProperties": false,
            "properties": {
                "__script": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                }
            }
        };

// 加入条件
// "$ref": "#/definitions/responses"
        schema.definitions.scriptObject = {
            "type": "object",
            "required": [
                "script"
            ],
            "additionalProperties": false,
            "properties": {
                "script": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                }
            }
        };
        schema.definitions.response.properties["condition"] = {
            "#ref": "#/definitions/scriptObject"
        };

        // "$ref": "#/definitions/vendorExtension"
        // "oneOf": [
        schema.definitions.response.properties["hold"] = {
            "type": "object",
            "description": "ms-time to take this response.",
            "properties": {
                "multipleOf": {
                    "$ref": "#/definitions/multipleOf"
                },
                "exclusiveMinimum": {
                    "$ref": "#/definitions/exclusiveMinimum"
                },
                "default": {
                    "$ref": "#/definitions/default"
                },
                "maximum": {
                    "$ref": "#/definitions/maximum"
                },
                "exclusiveMaximum": {
                    "$ref": "#/definitions/exclusiveMaximum"
                },
                "minimum": {
                    "$ref": "#/definitions/minimum"
                },
                "title": {
                    "$ref": "http://json-schema.org/draft-04/schema#/properties/title"
                },
                "description": {
                    "$ref": "http://json-schema.org/draft-04/schema#/properties/description"
                }
            }
        };
        // 加入更多info

        // schema.definitions.info.properties["id"] = {
        //     "type": "string",
        //     "description": "A unique id of the API."
        // };
        // schema.definitions.info.properties["branch"] = {
        //     "type": "string",
        //     "default": "master",
        //     "description": "branch of this api."
        // };
        // schema.definitions.info.required.push('id');

        // cookie
        schema.definitions.cookie = clone(schema.definitions.header);
        schema.definitions.cookies = {
            "type": "object",
            "additionalProperties": {
                "$ref": "#/definitions/cookie"
            }
        };

        // 添加cookie到response
        schema.definitions.response.properties['cookies'] = {
            "$ref": "#/definitions/cookies"
        };

        // 复制原有的
        make__script('maxItems', schema.definitions);
        make__script('minItems', schema.definitions);

        make__script('maxItems', schema.definitions.schema.properties);
        make__script('minItems', schema.definitions.schema.properties);

        // 调整code规则 满足3位都行
        schema.definitions.responses.patternProperties= {
            "^([0-9]{3,})$|^(default)$": {
                "$ref": "#/definitions/responseValue"
            },
            "^x-": {
                "$ref": "#/definitions/vendorExtension"
            }
        }
    }
};
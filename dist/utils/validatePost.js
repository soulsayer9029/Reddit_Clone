"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = void 0;
const validatePost = (input) => {
    if (input.text.length < 10) {
        return [
            {
                field: "text",
                message: "Description must contain more than 10 charecters"
            }
        ];
    }
    return null;
};
exports.validatePost = validatePost;
//# sourceMappingURL=validatePost.js.map
package resolver

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/vektah/gqlparser/gqlerror"
	"github.com/yoko/blog/graph/validator"
)

func validation(ctx context.Context, v validator.Validation) bool {
	isValid, errors := v.Validate()

	// falseならtrue
	if !isValid {
		for k, e := range errors {
			graphql.AddError(ctx, &gqlerror.Error{
				// err message
				Message: e,
				Extensions: map[string]interface{}{
					"field": k,
				},
			})
		}
	}
	return isValid
}

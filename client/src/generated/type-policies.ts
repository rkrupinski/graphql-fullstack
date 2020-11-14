import { FieldPolicy, FieldReadFunction, TypePolicies } from '@apollo/client/cache';
export type CatKeySpecifier = ('id' | 'name' | 'breed' | 'gifs' | CatKeySpecifier)[];
export type CatFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	breed?: FieldPolicy<any> | FieldReadFunction<any>,
	gifs?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CatGifKeySpecifier = ('id' | 'title' | 'url' | CatGifKeySpecifier)[];
export type CatGifFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageKeySpecifier = ('id' | 'type' | 'content' | MessageKeySpecifier)[];
export type MessageFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('cats' | 'cat' | 'messages' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	cats?: FieldPolicy<any> | FieldReadFunction<any>,
	cat?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addCat' | 'updateCat' | 'deleteCat' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addCat?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCat?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteCat?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CatMutationResponseKeySpecifier = ('success' | 'message' | 'cat' | CatMutationResponseKeySpecifier)[];
export type CatMutationResponseFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	cat?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Cat?: {
		keyFields?: false | CatKeySpecifier | (() => undefined | CatKeySpecifier),
		queryType?: true,
		mutationType?: true,
		subscriptionType?: true,
		fields?: CatFieldPolicy,
	},
	CatGif?: {
		keyFields?: false | CatGifKeySpecifier | (() => undefined | CatGifKeySpecifier),
		queryType?: true,
		mutationType?: true,
		subscriptionType?: true,
		fields?: CatGifFieldPolicy,
	},
	Message?: {
		keyFields?: false | MessageKeySpecifier | (() => undefined | MessageKeySpecifier),
		queryType?: true,
		mutationType?: true,
		subscriptionType?: true,
		fields?: MessageFieldPolicy,
	},
	Query?: {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		queryType?: true,
		mutationType?: true,
		subscriptionType?: true,
		fields?: QueryFieldPolicy,
	},
	Mutation?: {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		queryType?: true,
		mutationType?: true,
		subscriptionType?: true,
		fields?: MutationFieldPolicy,
	},
	CatMutationResponse?: {
		keyFields?: false | CatMutationResponseKeySpecifier | (() => undefined | CatMutationResponseKeySpecifier),
		queryType?: true,
		mutationType?: true,
		subscriptionType?: true,
		fields?: CatMutationResponseFieldPolicy,
	}
};
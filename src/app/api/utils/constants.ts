export const statusCodes={
    ok:200,
    notFound:404,
    unAuthorized:403,
    badRequest:400
} as const;

export const errors={
    ok:"OK",
    notFound:"Not Found",
    unAuthorized:"Not Authorized",
    badRequest:"Bad Request"

}as const;

export const errorCodes={
    duplicateEntry:11000
}
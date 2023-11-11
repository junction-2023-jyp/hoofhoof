// {"id":"18bbf0bc5682bb5b","threadId":"18bbf08e328265c1","labelIds":["UNREAD","CATEGORY_UPDATES","INBOX"],"snippet":"이 메일은 yengcraft@gmail.com 주소로 전송된 보안 경고의 사본입니다. engcraft1102@gmail.com 주소는 이 계정의 복구 이메일입니다. 모르는 계정이라면 삭제하세요 Mac에서 새로 로그인함 yengcraft@gmail.com Mac 기기에서 내 Google 계정에 새로 로그인했습니다. 직접 로그인한 것이 맞다면 아무런 조치를","payload":{"partId":"","mimeType":"multipart/alternative","filename":"","headers":[{"name":"Delivered-To","value":"engcraft1102@gmail.com"},{"name":"Received","value":"by 2002:a17:522:5493:b0:51b:da63:c513 with SMTP id k19csp307226pvi;        Sat, 11 Nov 2023 07:41:41 -0800 (PST)"},{"name":"X-Received","value":"by 2002:a05:6a00:1e0e:b0:690:d4f5:c664 with SMTP id gx14-20020a056a001e0e00b00690d4f5c664mr1355959pfb.11.1699717301595;        Sat, 11 Nov 2023 07:41:41 -0800 (PST)"},{"name":"ARC-Seal","value":"i=1; a=rsa-sha256; t=1699717301; cv=none;        d=google.com; s=arc-20160816;        b=N3oEBQlS501XmvxAH7CamFstne8rbf0iFb9aREpvnMv/rx/LH4A+WbwEouMnl6i4Kd         wBX+kI1CAc3AX...}}

// Gmail List Query
// q=category:promotions //프로모션 카테고리
// q=category:social //소셜 카테고리
// q=is:unread //안읽은 메일
// q=in:spam // 스팸메일

/**
 * Gmail API: get
 */
export interface GmailMessageHeader {
  name: string;
  value: string;
}
export interface GmailMessagePayload {
  partId: string;
  mimeType: string;
  filename: string;
  headers: GmailMessageHeader[];
}
export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: GmailMessagePayload;
}
/**
 * Gmail API: list
 */
export interface GmailList {
  messages: GmailListMessage[];
  nextPageToken: string; // 다음 페이지 토큰입니다.
  resultSizeEstimate: number; // 총 예상 결과 수입니다.
}
export interface GmailListMessage {
  id: string;
  threadId: string;
}

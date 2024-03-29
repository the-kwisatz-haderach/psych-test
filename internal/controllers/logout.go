package controllers

import (
	"net/http"
	"net/url"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// Handler for our logout.
func HandleLogout(ctx *gin.Context) {
	logoutUrl, err := url.Parse("https://" + os.Getenv("AUTH0_DOMAIN") + "/v2/logout")
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	returnTo, err := getReturnTo(ctx)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	parameters := url.Values{}
	parameters.Add("returnTo", returnTo)
	parameters.Add("client_id", os.Getenv("AUTH0_CLIENT_ID"))
	logoutUrl.RawQuery = parameters.Encode()

	session := sessions.Default(ctx)
	session.Clear()
	session.Options(sessions.Options{Path: "/", MaxAge: -1}) // this sets the cookie with a MaxAge of 0
	session.Save()

	ctx.Redirect(http.StatusTemporaryRedirect, logoutUrl.String())
}

func getReturnTo(ctx *gin.Context) (string, error) {
	returnTo := os.Getenv("AUTH0_LOGOUT_REDIRECT_URL")
	if returnTo == "" {
		scheme := "http"
		if ctx.Request.TLS != nil || ctx.Request.Header.Get("X-Forwarded-Proto") == "https" {
			scheme = "https"
		}
		returnToUrl, err := url.Parse(scheme + "://" + ctx.Request.Host)
		if err != nil {
			return "", err
		}
		returnTo = returnToUrl.String()
	}
	return returnTo, nil
}

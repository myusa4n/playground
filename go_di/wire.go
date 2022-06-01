//go:build wireinject
// +build wireinject

package main

import "github.com/google/wire"

func InitializeService() *Service {
	wire.Build(NewCRepository, NewServiceWire)
	return &Service{}
}

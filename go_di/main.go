package main

import (
	"fmt"

	"go.uber.org/dig"
)

type IRepository interface {
	List() []int
}

type CRepository struct {
}

func NewCRepository() IRepository {
	return &CRepository{}
}

func (r *CRepository) List() []int {
	return []int{1, 2, 3}
}

type ContextParams struct {
	dig.In

	Repository IRepository
}

type Service struct {
	repository IRepository
}

/*
func NewService(c ContextParams) *Service {
	return &Service{
		repository: c.Repository,
	}
}
*/

func NewServiceWire(r IRepository) *Service {
	return &Service{
		repository: r,
	}
}

func (s *Service) Use() []int {
	return s.repository.List()
}

/*
func diDig() {
	c := dig.New()
	c.Provide(NewCRepository)
	c.Provide(NewService)
	err := c.Invoke(func(s *Service, r IRepository) error {
		fmt.Println(s.Use())
		return fmt.Errorf("aaaaa")
	})
	fmt.Println(err)
	c.Invoke(func(s *Service) {
		fmt.Println(s.Use())
	})
}
*/

func diWire() {
	s := InitializeService()
	fmt.Println(s.Use())
}

func main() {
	diWire()
}

import React from 'react'
import { Switch } from 'react-router-dom'

import { items } from '~/components/Header/navigation'
import NotFound from '~/components/NotFound'
import Enrolls from '~/pages/Enrolls'
import EnrollsForm from '~/pages/EnrollsForm'
import HelpOrder from '~/pages/HelpOrder'
import Plans from '~/pages/Plans'
import PlansForm from '~/pages/PlansForm'
import SignIn from '~/pages/SignIn'
import Student from '~/pages/Student'
import StudentForm from '~/pages/StudentForm'

import Route from './Route'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      {/**
       * Rotas para Student
       */}
      <Route
        path={items.students.route}
        component={Student}
        navItem={items.students.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.students.route}/new`}
        component={StudentForm}
        navItem={items.students.name}
        isPrivate
      />
      <Route
        path={`${items.students.route}/:id/edit`}
        component={StudentForm}
        navItem={items.students.name}
        isPrivate
      />

      {/**
       * Rotas para PLANOS
       */}
      <Route
        path={items.plans.route}
        component={Plans}
        navItem={items.plans.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.plans.route}/new`}
        component={PlansForm}
        navItem={items.plans.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.plans.route}/:id/edit`}
        component={PlansForm}
        navItem={items.plans.name}
        isPrivate
      />

      {/**
       * Rotas para Matriculas
       */}
      <Route
        path={items.enrolls.route}
        component={Enrolls}
        navItem={items.enrolls.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.enrolls.route}/new`}
        component={EnrollsForm}
        navItem={items.enrolls.name}
        isPrivate
      />
      <Route
        path={`${items.enrolls.route}/:id/edit`}
        component={EnrollsForm}
        navItem={items.enrolls.name}
        isPrivate
      />

      {/**
       * Rotas para Pedido de ajuda
       */}
      <Route
        path={items.helpOrders.route}
        component={HelpOrder}
        navItem={items.helpOrders.name}
        isPrivate
      />

      <Route path="*" exact>
        <NotFound />
      </Route>
    </Switch>
  )
}

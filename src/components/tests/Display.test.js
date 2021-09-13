import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from '../Display'

import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

test("renders without any props", ()=>{
    render(<Display />)
})


const testShow = {
    name: 'Breaking Bad',
    summary: 'A teacher becomes a Meth cook',
    seasons: [{
        name: 'S1',
        id: '1',
        episodes:[]
    },
    {
     name: 'S2',
     id: '2',
     episodes:[]
 }]
 }

 test("fetch pressed component displays", async ()=>{
    mockFetchShow.mockResolvedValueOnce(testShow)
    render(<Display />)
    const button =screen.getByRole('button')
    userEvent.click(button)

    const show = await screen.findByTestId("show-container")
    expect(show).toBeInTheDocument()
 })

 test("renders options same as fetch return when clicked", async ()=>{
    mockFetchShow.mockResolvedValueOnce(testShow)
    render(<Display />)
    const button =screen.getByRole('button')
    userEvent.click(button)

    await waitFor(()=>{
        const seasonOptions = screen.queryAllByTestId('season-option')
        expect(seasonOptions).toHaveLength(2)
    })
 })


test("displayFunc is called when the fetch button pressed", async ()=>{
    mockFetchShow.mockResolvedValueOnce(testShow)
    const displayFunc = jest.fn()
    render(<Display displayFunc={displayFunc} />)
    const button =screen.getByRole('button')
    userEvent.click(button)

    await waitFor(()=>{
        expect(displayFunc).toHaveBeenCalled()
    })


})







///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
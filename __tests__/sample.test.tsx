import { render, screen } from '@testing-library/react'
import Home from '@/app/page' // Assuming your main page component is in app/page.tsx

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /pokéblog/i, // Adjusted to match the actual heading
    })

    expect(heading).toBeInTheDocument()
  })
})

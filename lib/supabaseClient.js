import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kdreqzyvypvkarbxoqqr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcmVxenl2eXB2a2FyYnhvcXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NjI2NzUsImV4cCI6MjA2NzIzODY3NX0.93osMmVC05n9usTZPxfTrJJN0Lnc1Rvvx-ej6r_XlEc'

export const supabase = createClient(supabaseUrl, supabaseKey)